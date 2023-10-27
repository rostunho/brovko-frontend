export default function BackToTopIcon(props) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={20} cy={20} r={20} fill="#F3A610" />
      <path
        d="M20.346 16.538l-.354-.354-.354.354-7.906 7.922s0 0 0 0a.136.136 0 01-.192 0 .123.123 0 01.004-.181l.006-.005.005-.006 8.357-8.356a.143.143 0 01.096-.04c.04 0 .067.011.096.04l8.356 8.356a.136.136 0 010 .192.136.136 0 01-.192 0l-7.922-7.922z"
        stroke="#fff"
      />
    </svg>
  );
}
