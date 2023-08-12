export default function CalendarIcon(props) {
  return (
    <svg
      width={17}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 14V2h15v12H1z"
        stroke="inherit"
        strokeOpacity={0.7}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 4H3v2h2V4zM5 7H3v2h2V7zM5 10H3v2h2v-2zM8 4H6v2h2V4zM8 7H6v2h2V7zM8 10H6v2h2v-2zM11 4H9v2h2V4zM11 7H9v2h2V7zM11 10H9v2h2v-2zM14 4h-2v2h2V4zM14 7h-2v2h2V7z"
        stroke="inherit"
        strokeOpacity={0.7}
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
