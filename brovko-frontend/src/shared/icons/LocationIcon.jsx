

function LocationIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12 21.189l.72-.813a59.047 59.047 0 002.21-2.672l.54-.713c2.258-3.041 3.387-5.455 3.387-7.239 0-3.808-3.07-6.895-6.857-6.895-3.788 0-6.857 3.087-6.857 6.895 0 1.784 1.129 4.198 3.386 7.239l.54.713A62.732 62.732 0 0012 21.189z"
        stroke="#F3A610"
        strokeWidth={1.143}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.571a2.857 2.857 0 100-5.714 2.857 2.857 0 000 5.714z"
        stroke="#F3A610"
        strokeWidth={1.143}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LocationIcon;