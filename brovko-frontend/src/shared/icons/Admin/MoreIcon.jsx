export default function MoreIcon({
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
        clipPath="url(#prefix__clip0_41_134)"
        stroke="#191C2C"
        strokeWidth={1.5}
      >
        <circle
          cx={12}
          cy={12}
          r={11.25}
          stroke={color || borderColor || '#191C2C'}
        />
        <path
          d="M12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.5 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-11 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          stroke={color || iconColor || '#191C2C'}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_41_134">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
