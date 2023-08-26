export default function AddingPlusIcon({ small, ...props }) {
  return (
    <svg
      width={!small ? 24 : 16}
      height={!small ? 24 : 16}
      fill="inherit"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {!small ? (
        <>
          <g clipPath="url(#prefix__clip0_131_861)">
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm0 22.524C6.21 22.524 1.5 17.79 1.5 12 1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.524 12 22.524zm5.25-11.274h-4.5v-4.5a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5z"
              fill="inherit"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_131_861">
              <path fill="inherit" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </>
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.5 4C8.5 3.72386 8.27614 3.5 8 3.5C7.72386 3.5 7.5 3.72386 7.5 4V7.5H4C3.72386 7.5 3.5 7.72386 3.5 8C3.5 8.27614 3.72386 8.5 4 8.5H7.5V12C7.5 12.2761 7.72386 12.5 8 12.5C8.27614 12.5 8.5 12.2761 8.5 12V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H8.5V4Z"
          fill="inherit"
          stroke="inherit"
        />
      )}
    </svg>
  );
}
