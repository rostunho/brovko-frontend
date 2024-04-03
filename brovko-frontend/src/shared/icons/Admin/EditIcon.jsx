export default function EditIcon({
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
      <g clipPath="url(#prefix__clip0_31_109)">
        <circle
          cx={12}
          cy={12}
          r={11.25}
          stroke={color || borderColor || '#191C2C'}
          strokeWidth={1.5}
        />
        <path
          d="M15.536 5.636l.53-.53a.75.75 0 00-1.06 0l.53.53zm-7.779 7.778l-.53-.53a.75.75 0 00-.205.383l.735.147zM7.05 16.95l-.735-.147-.22 1.103 1.102-.22-.147-.736zm3.536-.707l.147.735a.75.75 0 00.383-.205l-.53-.53zm7.778-7.779l.53.53a.75.75 0 000-1.06l-.53.53zm-3.359-3.358l-7.778 7.778 1.06 1.06 7.779-7.778-1.06-1.06zm-7.983 8.161l-.707 3.536 1.47.294.708-3.536-1.471-.294zm.175 4.418l3.536-.707-.294-1.47-3.536.706.294 1.471zm3.92-.912l7.777-7.778-1.06-1.06-7.778 7.777 1.06 1.061zm7.777-8.839l-2.828-2.828-1.06 1.06 2.828 2.829 1.06-1.06z"
          fill={color || iconColor || '#191C2C'}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_31_109">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
