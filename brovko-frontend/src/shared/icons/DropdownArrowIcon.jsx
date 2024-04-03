export default function DropdownArrowIcon({ size, ...props }) {
  return (
    <svg
      width={size ? size : 24}
      height={size ? size : 24}
      viewBox="0 0 24 24"
      // fill="none"
      // stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="inherit"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
