import {graph} from "@/components/map/GraphObject.ts";
import {Node, NodeType} from "@/components/navigation/pathfinding/Graph.ts";

import {nodeMarker} from "./markerStyles.ts";
import {BORDER_WEIGHT, COLORS, CORE_WEIGHT, makeStroke} from "@/components/map/overlays/edgeHandler.ts";

let prevMarker: google.maps.marker.AdvancedMarkerElement | null = null;

export function createMarkers(
    map: google.maps.Map,
    lib: google.maps.MarkerLibrary,
    nodes: Node[],
    setNodeDetails: (node: Node) => void,
    type: 'normal' | 'removed' = 'normal',
    onNodeMove: () => void = () => {},
    setSelectedNode?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void
){
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];
    const zIndex = type === 'removed' ? 9999 : 1; // Red dot on top, Blue dot at the bottom
    console.log("number of nodes for floor: ", nodes);
    for (const node of nodes) {
        const coord: google.maps.LatLngLiteral = {
            lat: node.x-0.000002,
            lng: node.y,
        };
        if (!node.id) continue;
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: coord,
            map: map,
            title: node.id.toString(),
            gmpDraggable: true,
            content: nodeMarker(graph.neighborCount(node.id), "normal"),
            collisionBehavior: lib.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
            zIndex
        });

        markerUI(marker, node, setNodeDetails, onNodeMove, setSelectedNode);
        markers.push(marker);
    }

    return markers;
}

function markerUI(marker: google.maps.marker.AdvancedMarkerElement, node: Node,
                  setSelectedNode: (node: Node) => void, onNodeMove: () => void,
                  onNodeClicked?: (n: Node, m: google.maps.marker.AdvancedMarkerElement) => void) {

    // Double click node to remove it
    const content = marker.content as HTMLElement;

    // Correct double click detection for AdvancedMarkerElement
    content.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );

        if (node.id) graph.deleteNode(node.id);
        console.log("remove node");
        content.style.transition = "transform 0.7s ease, opacity 0.7s ease";
        content.style.transform = "scale(0)";
        content.style.opacity = "0";

        // After animation, delete from graph and hide marker
        setTimeout(() => {
            if (node.id) graph.deleteNode(node.id);
            marker.map = null;
        }, 500); // Match the transition time (300ms)

        connectedEdges.forEach(edge => {
            // You can delete the polyline by setting its map to null here
            if (edge.overlay && edge.core && edge.border) {
                edge.overlay.setMap(null);
                edge.core.setMap(null);
                edge.border.setMap(null);
            }
        });
    });

    // Track all temporary poly lines we create for this node
    const tempEdgeGraphics: {
        border: google.maps.Polyline;
        core: google.maps.Polyline;
        overlay: google.maps.Polyline;
    }[] = [];

    marker.addListener('dragstart', () => {
        console.log("Clicked: ", node);
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );
        // Delete edges from the graph and from the map visually
        connectedEdges.forEach(edge => {
            // You can delete the polyline by setting its map to null here
            if (edge.overlay && edge.core && edge.border) {
                edge.overlay.setMap(null);
                edge.core.setMap(null);
                edge.border.setMap(null);
            }
        });

        // Create a temporary polyline for each connected edge
        for (const edge of connectedEdges) {
            const otherNode = edge.sourceId.id === node.id ? edge.targetId : edge.sourceId;
            const map = marker.map;
            const path = [
                {lat: node.x, lng: node.y},
                {lat: otherNode.x, lng: otherNode.y}
            ]

            const border  = makeStroke(map, path, COLORS.border, BORDER_WEIGHT, 1);
            const core    = makeStroke(map, path, COLORS.core,    CORE_WEIGHT, 2, true);

            const overlay = new google.maps.Polyline({
                map,
                path,
                geodesic: true,
                strokeOpacity: 0,
                zIndex: 3,
                clickable: false,});

            tempEdgeGraphics.push({border, core, overlay});
        }});

    // Get node Info
    content.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedNode(node);
        if (onNodeClicked) onNodeClicked(node, marker);
        content.classList.add("node-selected");
        if (prevMarker && prevMarker.content) {
            (prevMarker.content as HTMLElement).classList.remove("node-selected");
        }
        content.classList.add("node-selected");
        prevMarker = marker;
    })

    // Update poly lines during drag
    marker.addListener('drag', () => {
        const pos = marker.position;
        if (!pos) return;

        // Find all edges connected to this node
        const connectedEdges = graph.getAllEdges().filter(
            edge => edge.sourceId.id === node.id || edge.targetId.id === node.id
        );

        // Update each temporary polyline
        for (let i = 0; i < connectedEdges.length && i < tempEdgeGraphics.length; i++) {
            const edge = connectedEdges[i];
            const { border, core, overlay } = tempEdgeGraphics[i];
            const otherNode = edge.sourceId.id === node.id ? edge.targetId : edge.sourceId;

            const newPath = [
                {
                    lat: (pos as google.maps.LatLngLiteral).lat + 0.000002,
                    lng: (pos as google.maps.LatLngLiteral).lng
                },
                {lat: otherNode.x, lng: otherNode.y}
            ]

            border.setPath(newPath);
            core.setPath(newPath);
            overlay.setPath(newPath);
        }
    });

    // Clean up when drag ends
    marker.addListener('dragend', () => {
        const newPos = marker.position;
        setSelectedNode(node);
        if (newPos) {
            node.x = (newPos as google.maps.LatLngLiteral).lat + 0.000002;
            node.y = (newPos as google.maps.LatLngLiteral).lng;
            console.log(`Updated node ${node.id} to new position: (${node.x}, ${node.y})`);
            graph.editNode(node);
        }

        // Remove temporary polylines
        for (const graphics of tempEdgeGraphics) {
            graphics.border.setMap(null);
            graphics.core.setMap(null);
            graphics.overlay.setMap(null);
        }
        tempEdgeGraphics.length = 0;

        onNodeMove();

    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let numAdded = 1

export function resetInc(){
    numAdded = 1
}

export function addNodeListener(
    map: google.maps.Map,
    building: string,
    floor: number,
    setNodeDetails: (node: Node) => void,
    firstNode: Node,
    onNodeMove: () => void
): google.maps.MapsEventListener {
    return google.maps.event.addListener(map, "dblclick", (event) => {
        const id = firstNode.id + numAdded;
        const newNode: Node = { id, name:'', building, floor, x:event.latLng.lat(), y:event.latLng.lng(), edgeCost:0, totalCost:0, type:NodeType.Hall };
        graph.addNode(newNode);
        onNodeMove();

        numAdded += 1;
    });
}