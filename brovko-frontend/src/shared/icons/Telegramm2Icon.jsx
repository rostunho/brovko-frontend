import * as React from "react";

function Telegramm2Icon(props) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   
      {...props}
    >
      <rect width={32} height={32} rx={16} />
      <g clipPath="url(#prefix__clip0_3834_15139)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.688 7.43a1.493 1.493 0 012.052 1.617l-2.257 13.69c-.219 1.32-1.668 2.078-2.879 1.42-1.013-.55-2.517-1.398-3.87-2.283-.677-.443-2.75-1.86-2.495-2.87.219-.863 3.701-4.105 5.692-6.032.78-.757.425-1.194-.498-.497-2.29 1.729-5.968 4.359-7.184 5.1-1.073.652-1.632.764-2.301.652-1.22-.203-2.351-.517-3.275-.9-1.248-.518-1.187-2.233 0-2.733l17.015-7.165z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_3834_15139">
          <path fill="#fff" transform="translate(4 4)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Telegramm2Icon;