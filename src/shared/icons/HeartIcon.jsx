import * as React from 'react';

function HeartIcon({ checked, ...props }) {
  return (
    <svg
      className={checked ? 'heart_icon checked' : 'heart_icon'}
      width={32}
      height={32}
      fill="none"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 28a2 2 0 001.125-.348c4.912-3.335 7.039-5.62 8.212-7.05 2.5-3.047 3.697-6.175 3.663-9.563C28.96 7.158 25.846 4 22.057 4c-2.755 0-4.663 1.552-5.774 2.844a.375.375 0 01-.566 0C14.605 5.551 12.697 4 9.942 4 6.154 4 3.04 7.157 3 11.04c-.034 3.388 1.164 6.516 3.663 9.563 1.173 1.429 3.3 3.715 8.212 7.05A2 2 0 0016 28z"
        // fill={checked ? 'rgba(243, 166, 16, 1)' : 'transparent'}
        // stroke={checked ? 'rgba(243, 166, 16, 1)' : 'rgba(243, 166, 16, 1)'}
        strokeWidth="1"
      />
    </svg>
  );
}

export default HeartIcon;
