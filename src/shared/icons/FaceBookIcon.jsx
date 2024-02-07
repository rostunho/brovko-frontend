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
      <rect width={32} height={32} rx={16} fill="#F3A610" />
      <path
        d="M18 17.5h2.5l1-4H18v-2c0-1.03 0-2 2-2h1.5V6.14c-.326-.043-1.557-.14-2.857-.14C15.928 6 14 7.657 14 10.7v2.8h-3v4h3V26h4v-8.5z"
        fill="#fff"
      />
    </svg>
  );
}

export default FaceBookIcon;