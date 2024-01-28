export default function CheckIcon({ check, ...props }) {
  // return (
  //   <svg
  //     width={32}
  //     height={32}
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //     {...props}
  //   >
  //     <path
  //       d="M21.94 9.94a1.5 1.5 0 012.14 2.1l-7.98 9.98a1.5 1.5 0 01-2.16.04l-5.292-5.292a1.5 1.5 0 112.12-2.12l4.188 4.186 6.946-8.85c.012-.015.024-.03.038-.044z"
  //       fill={check || '#68BAEE'}
  //     />
  //   </svg>
  // );

  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_5029_10088)">
        <path
          d="M13.513 2.414A1.456 1.456 0 0114.539 2c.382.003.748.157 1.02.43.273.273.43.644.44 1.033.01.39-.128.768-.386 1.056l-7.831 10A1.473 1.473 0 016.73 15a1.444 1.444 0 01-1.068-.44L.469 9.258A1.503 1.503 0 010 8.183a1.531 1.531 0 01.431-1.089 1.47 1.47 0 011.067-.44 1.447 1.447 0 011.051.478l4.11 4.195 6.817-8.868c.012-.016.023-.03.037-.045z"
          fill={check || '#68BAEE'}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_5029_10088">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
