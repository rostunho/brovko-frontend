export default function BackToTopIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_d_1613_2634)">
        <circle
          cx="35"
          cy="35"
          r="30"
          //  fill="#F3A610"
        />
      </g>
      <path
        d="M34.8057 29.3512L34.4518 28.9973L34.0983 29.3516L23.0842 40.3873C22.9339 40.5376 22.6889 40.5376 22.5387 40.3873C22.3904 40.239 22.3899 40.0024 22.5494 39.8523L22.5549 39.8471L22.5602 39.8418L34.201 28.201C34.2739 28.1281 34.3815 28.0883 34.4738 28.0883C34.5812 28.0883 34.6692 28.1237 34.7465 28.201L46.3873 39.8418C46.5376 39.9921 46.5376 40.237 46.3873 40.3873C46.237 40.5376 45.9921 40.5376 45.8418 40.3873L34.8057 29.3512Z"
        stroke="white"
      />
      <defs>
        <filter
          id="filter0_d_1613_2634"
          x="0"
          y="0"
          width="72"
          height="72"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_1613_2634"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1613_2634"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1613_2634"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
