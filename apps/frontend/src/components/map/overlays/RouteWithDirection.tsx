import { Node } from "@/components/navigation/pathfinding/Graph";
import { drawPath } from "./edgeHandler";
import {
    generateDirections,
    getTextDirections,
    formatDistance,
    calculatePathDistance,
    DirectionStep
} from "./DirectionHandler.ts";

export interface RouteWithDirectionsResult {
    path: google.maps.Polyline;
    directions: string[];
    steps: DirectionStep[];
    totalDistance: string;
    currentFloor: number;
    currentStep: number;
}

export function showRouteWithDirections(
    map: google.maps.Map,
    nodes: Node[],
    currentFloor: number,
    onFloorChange?: (floor: number) => void,
    mapHeading: number = 0
): RouteWithDirectionsResult {
    // draw the path on the map
    const path = drawPath(map, nodes);

    // generate the direction steps
    const steps = generateDirections(nodes, mapHeading).map(step => {
        if (step.isFloorChange && step.changeType && onFloorChange) {
            return {
                ...step,
                onActivate: () => onFloorChange(step.endNode.floor)
            }
        }
        return step;
    })

    // convert steps to text instructions
    const directions = getTextDirections(steps);
    // calculate total distance
    const totalDistance = formatDistance(calculatePathDistance(nodes));
    return {
        path,
        directions,
        steps,
        totalDistance,
        currentFloor,
        currentStep: 0 // initialize current step
    }
}

export function updateRouteProgress(
    route: RouteWithDirectionsResult,
    progress: number,
    currentFloor: number
): { updated: boolean, currentInstruction?: string } {
    const totalDistance = route.steps.reduce(
        (sum, step) => sum + (step.isFloorChange ? 0 : parseFloat(step.distance)),
        0
    );
    const distanceCovered = totalDistance * progress;
    let accumulatedDistance = 0;
    let newStepIndex = 0;

    for (let i = 0; i < route.steps.length; i++){
        const step = route.steps[i];

        if (step.isFloorChange) {
            if (i < route.currentStep && step.endNode.floor === currentFloor) {
                newStepIndex = i + 1
            }
            continue;
        }

        accumulatedDistance += parseFloat(step.distance);
        if (accumulatedDistance > distanceCovered) {
            newStepIndex = i;
            break;
        }
    }

    if (newStepIndex !== route.currentStep) {
        const currentStep = route.steps[newStepIndex];

        // call on activate if it exists
        if (currentStep?.onActivate) {
            currentStep.onActivate();
        }

        return {
            updated: true, 
            currentInstruction: currentStep?.instruction
        }
    }
    return { updated: false };
}