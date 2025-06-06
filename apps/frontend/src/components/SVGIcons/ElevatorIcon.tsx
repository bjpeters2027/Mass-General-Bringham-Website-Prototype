import React from 'react';

type ElevatorIconProps = {
    size?: number | string;
    className?: string;
    stroke?: string;
    fill?: string;
};

const ElevatorIcon: React.FC<ElevatorIconProps> = (
    {
        size = 32,
        className = '',
        stroke = 'black',
        fill = 'black',
    }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={size} height={size}
         viewBox="25 0 800 800"
         className={className}>

        <path id="Imported Path"
              fill={fill} fillRule={"evenodd"} stroke={stroke} strokeWidth="1"
              d="M 272.22,0.00
           C 219.40,0.00 176.43,42.98 176.43,95.80
             176.43,95.80 176.43,704.20 176.43,704.20
             176.43,757.02 219.40,800.00 272.22,800.00
             272.22,800.00 527.75,800.00 527.75,800.00
             580.58,800.00 623.57,757.02 623.57,704.20
             623.57,704.20 623.57,95.80 623.57,95.80
             623.57,42.98 580.59,0.00 527.75,0.00
             527.75,0.00 272.22,0.00 272.22,0.00 Z
           M 577.30,95.80
           C 577.30,95.80 577.30,704.20 577.30,704.20
             577.30,731.50 555.08,753.72 527.78,753.72
             527.78,753.72 272.22,753.72 272.22,753.72
             244.91,753.72 222.72,731.50 222.72,704.20
             222.72,704.20 222.72,95.80 222.72,95.80
             222.72,68.50 244.91,46.28 272.22,46.28
             272.22,46.28 527.75,46.28 527.75,46.28
             555.07,46.28 577.30,68.50 577.30,95.80 Z
           M 511.63,376.26
           C 511.63,376.26 289.62,376.26 289.62,376.26
             276.85,376.26 266.49,386.61 266.49,399.40
             266.49,412.18 276.85,422.54 289.62,422.54
             289.62,422.54 511.63,422.54 511.63,422.54
             524.41,422.54 534.77,412.18 534.77,399.40
             534.77,386.61 524.41,376.26 511.63,376.26 Z
           M 511.63,457.06
           C 511.63,457.06 289.62,457.06 289.62,457.06
             281.35,457.06 273.72,461.47 269.58,468.63
             265.43,475.79 265.43,484.61 269.58,491.77
             269.58,491.77 380.60,684.20 380.60,684.20
             384.72,691.35 392.36,695.77 400.63,695.77
             408.90,695.77 416.54,691.35 420.67,684.20
             420.67,684.20 531.67,491.77 531.67,491.77
             535.83,484.61 535.80,475.79 531.67,468.63
             527.54,461.47 519.92,457.06 511.63,457.06 Z
           M 400.65,626.32
           C 400.65,626.32 329.69,503.34 329.69,503.34
             329.69,503.34 471.59,503.34 471.59,503.34
             471.59,503.34 400.65,626.32 400.65,626.32 Z
           M 400.65,103.38
           C 392.38,103.38 384.74,107.79 380.61,114.94
             380.61,114.94 269.58,307.37 269.58,307.37
             265.43,314.52 265.43,323.34 269.58,330.50
             273.72,337.66 281.35,342.07 289.62,342.07
             289.62,342.07 511.63,342.07 511.63,342.07
             519.92,342.07 527.54,337.66 531.68,330.50
             535.83,323.34 535.83,314.52 531.68,307.37
             531.68,307.37 420.68,114.95 420.68,114.95
             416.55,107.79 408.92,103.38 400.65,103.38 Z
           M 329.70,295.80
           C 329.70,295.80 400.65,172.83 400.65,172.83
             400.65,172.83 471.59,295.80 471.59,295.80
             471.59,295.80 329.70,295.80 329.70,295.80 Z" />
    </svg>
);

export default ElevatorIcon;
