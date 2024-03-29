import * as React from 'react';
export default function TrashIcon({ width, height, fill,stroke, className }) {
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.66663 3.42859H13.3333M6.47615 5.71431V11.8095M9.52377 5.71431V11.8095M4.19044 3.42859H11.8095V12.5715C11.8095 12.9756 11.6489 13.3632 11.3632 13.6489C11.0774 13.9347 10.6898 14.0953 10.2857 14.0953H5.71425C5.31011 14.0953 4.92252 13.9347 4.63675 13.6489C4.35098 13.3632 4.19044 12.9756 4.19044 12.5715V3.42859ZM7.99996 1.90479C8.3844 1.90466 8.75468 2.04986 9.03657 2.31126C9.31846 2.57266 9.49113 2.93095 9.51996 3.31431L9.52377 3.42859H6.47615C6.47615 3.02446 6.63669 2.63687 6.92246 2.3511C7.20823 2.06533 7.59582 1.90479 7.99996 1.90479Z"
        stroke={stroke || '000'}
        strokeWidth="0.761905"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
