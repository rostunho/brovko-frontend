export default function CheckIcon({ check, rectFill, rectStroke, ...props }) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.5}
        y={0.5}
        width={15}
        height={15}
        rx={3.5}
        fill={rectFill}
        stroke={rectStroke}
      />
      <path
        d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425.019-.022z"
        fill={check}
      />
    </svg>
  );
}
