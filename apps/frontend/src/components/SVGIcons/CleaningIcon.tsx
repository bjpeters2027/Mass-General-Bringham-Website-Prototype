import React from 'react';

type CleaningIconProps = {
    size?: number | string;
    className?: string;
    stroke?: string;
    fill?: string;
};

const CleaningIcon: React.FC<CleaningIconProps> = (
    {
        size = 32,
        className = '',
        stroke = 'black',
        fill = 'black',
    }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={size} height={size}
         viewBox="10 10 780 780"
         className={className}>
        <path id="Imported Path"
              strokeLinecap={"round"} fill={"none"} stroke={stroke} strokeWidth="50"
              d="M 401.26,399.78
           C 401.26,399.78 401.26,449.78 401.26,449.78M 358.76,324.78
           C 358.76,324.78 233.76,524.78 233.76,524.78
             213.76,557.28 238.76,599.78 276.26,599.78
             276.26,599.78 331.02,599.78 389.28,599.78
             455.51,599.78 526.26,599.78 526.26,599.78
             566.26,599.78 591.26,557.28 568.76,524.78
             568.76,524.78 443.76,324.78 443.76,324.78
             426.26,292.28 376.26,292.28 358.76,324.78 Z
           M 463.76,199.78
           C 463.76,199.78 338.76,199.78 338.76,199.78
             318.76,199.78 301.26,182.28 301.26,162.28
             301.26,162.28 301.26,162.28 301.26,162.28
             301.26,142.28 318.76,124.78 338.76,124.78
             338.76,124.78 463.76,124.78 463.76,124.78
             483.76,124.78 501.26,142.28 501.26,162.28
             501.26,162.28 501.26,162.28 501.26,162.28
             501.26,182.28 483.76,199.78 463.76,199.78 Z
           M 311.26,699.78
           C 311.26,699.78 491.26,699.78 491.26,699.78
             513.76,699.78 536.26,709.78 551.26,724.78
             551.26,724.78 551.26,724.78 551.26,724.78
             566.26,739.78 588.76,749.78 611.26,749.78
             611.26,749.78 696.26,749.78 696.26,749.78
             711.26,749.78 723.76,734.78 721.26,719.78
             721.26,719.78 616.26,132.28 616.26,132.28
             608.76,84.78 566.26,49.78 518.76,49.78
             518.76,49.78 286.26,49.78 286.26,49.78
             236.26,49.78 196.26,84.78 186.26,132.28
             186.26,132.28 81.26,719.78 81.26,719.78
             78.76,734.78 91.26,749.78 106.26,749.78
             106.26,749.78 191.26,749.78 191.26,749.78
             213.76,749.78 236.26,739.78 251.26,724.78
             251.26,724.78 251.26,724.78 251.26,724.78
             266.26,709.78 288.76,699.78 311.26,699.78 Z
           M 401.13,526.17
           C 401.13,526.17 401.09,523.09 401.09,523.09" />
    </svg>

);

export default CleaningIcon;




