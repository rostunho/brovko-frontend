import * as React from "react";

function FaceBookIcon(props) {
  
    return (
      <svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width={32} height={32} rx={16} />
        <path
          d="M17.364 6a4.09 4.09 0 00-4.09 4.09v3.183H11a.455.455 0 00-.454.454v3.637a.455.455 0 00.454.454h2.273v7.727a.455.455 0 00.455.455h3.636a.455.455 0 00.455-.454v-7.728h2.272a.455.455 0 00.441-.344l.91-3.637a.454.454 0 00-.442-.564H17.82v-1.364a1.364 1.364 0 011.363-1.364H21a.455.455 0 00.455-.454V6.455A.455.455 0 0021 6h-3.636z"
          fill="#fff"
        />
      </svg>
    );
  }
  

export default FaceBookIcon;