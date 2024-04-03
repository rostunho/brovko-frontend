export default function BackToTopIcon(props) {
  return (
    <svg
      width={64}
      height={64}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_39_125)">
        <g filter="url(#prefix__filter0_dd_39_125)">
          <circle cx={32} cy={32} r={30} fill="#F3A610" />
        </g>
        <path
          d="M16 38l16.5-12L48 38"
          stroke="#FEFEFE"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_39_125">
          <path fill="#fff" d="M0 0h64v64H0z" />
        </clipPath>
        <filter
          id="prefix__filter0_dd_39_125"
          x={-1}
          y={-1}
          width={66}
          height={66}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={1} dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_39_125"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={-1} dy={-1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
          <feBlend
            in2="effect1_dropShadow_39_125"
            result="effect2_dropShadow_39_125"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_39_125"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
