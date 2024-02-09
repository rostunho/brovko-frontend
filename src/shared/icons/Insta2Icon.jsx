import * as React from "react";

function Insta2Icon(props) {

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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.857 7A3.857 3.857 0 007 10.856v10.286A3.858 3.858 0 0010.857 25h10.287A3.858 3.858 0 0025 21.142V10.856A3.858 3.858 0 0021.144 7H10.858zm11.397 3.862a1.11 1.11 0 11-2.222 0 1.11 1.11 0 012.222 0zm-6.252 2.056a3.081 3.081 0 100 6.162 3.081 3.081 0 000-6.162zm-4.564 3.081a4.563 4.563 0 119.126 0 4.563 4.563 0 01-9.126 0z"
        fill="#fff"
      />
    </svg>
  );
}



export default Insta2Icon;