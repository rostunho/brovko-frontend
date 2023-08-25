export default function GoBackIcon(props) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={20} cy={20} r={19.5} stroke="#F3A610" />
      <g clipPath="url(#prefix__clip0_90_773)">
        <path
          d="M23.709 27.045a.51.51 0 000-.72L17.37 20l6.338-6.338a.51.51 0 00-.72-.72l-6.685 6.686c-.1.1-.149.223-.149.36 0 .124.05.26.149.36l6.685 6.684c.199.211.521.211.72.013z"
          fill="#F3A610"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_90_773">
          <path fill="#fff" transform="rotate(90 8 20)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
