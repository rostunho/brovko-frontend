export default function DeleteCrossIcon({ cross, bg, ...props }) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   transform="rotate(45)"
      {...props}
    >
      <circle cx={8} cy={8} r={8} fill={bg || '#F6371E'} />
      <path
        d="M5.172 10.828l5.656-5.656m0 5.656L5.172 5.172"
        stroke={cross || '#FEFEFE'}
        strokeLinecap="round"
      />
    </svg>
  );
}
