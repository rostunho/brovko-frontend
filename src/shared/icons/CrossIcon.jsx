// color = stroke

function CrossIcon({ size, ...props }) {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 5L5 19M5 5l14 14"
        // stroke="#54ADFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CrossIcon;
