export default function ViewIcon({
  size,
  color,
  iconColor,
  borderColor,
  ...props
}) {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#prefix__clip0_30_30)"
        stroke="#191C2C"
        strokeWidth={1.5}
      >
        <circle
          cx={12}
          cy={12}
          r={11.25}
          stroke={color || borderColor || '#191C2C'}
          strokeWidth={1.5}
        />
        <path
          d="M12 6c-6.429 0-9 6-9 6s2.571 6 9 6 9-6 9-6-2.571-6-9-6z"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color || iconColor || '#191C2C'}
        />
        <path
          d="M12 15a3 3 0 100-6 3 3 0 000 6z"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color || iconColor || '#191C2C'}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_30_30">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
