export default function LinkIcon(props) {
  return (
    <svg
      width={14}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 9v5H1V5h6.5M7 9.5L13.5 3m0 0v4.5m0-4.5h-4"
        stroke="inherit"
        strokeOpacity={0.7}
        strokeLinecap="round"
      />
    </svg>
  );
}
