export default function WarningIcon({ color, ...props }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 22a10 10 0 100-20 10 10 0 000 20zm-1.5-5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm.516-9.68a1 1 0 011.968 0L13 7v5l-.016.18a1 1 0 01-1.968 0L11 12V7l.016-.18z"
        fill={color || '#F84147'}
      />
    </svg>
  );
}
