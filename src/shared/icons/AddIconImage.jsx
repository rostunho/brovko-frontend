export default function AddIconImage({ width, height, fill, className }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill={fill || 'inherit'}
        className={className}
      >
        <path
          d="M8.71657 33.3333C7.97657 33.3333 7.34324 33.0695 6.81657 32.5417C6.28879 32.015 6.0249 31.3817 6.0249 30.6417V9.35834C6.0249 8.61834 6.28879 7.98501 6.81657 7.45834C7.34324 6.93057 7.97657 6.66668 8.71657 6.66668H21.8582C22.0949 6.66668 22.2932 6.74668 22.4532 6.90668C22.6121 7.06668 22.6916 7.26501 22.6916 7.50168C22.6916 7.73723 22.6121 7.93501 22.4532 8.09501C22.2932 8.2539 22.0949 8.33334 21.8582 8.33334H8.71824C8.41824 8.33334 8.17212 8.42945 7.9799 8.62168C7.78768 8.8139 7.69157 9.05945 7.69157 9.35834V30.6417C7.69157 30.9406 7.78768 31.1861 7.9799 31.3783C8.17324 31.5706 8.41935 31.6667 8.71824 31.6667H29.9999C30.2999 31.6667 30.5455 31.5706 30.7366 31.3783C30.9277 31.1861 31.0238 30.9406 31.0249 30.6417V17.5C31.0249 17.2633 31.1049 17.0656 31.2649 16.9067C31.4249 16.7478 31.6232 16.6678 31.8599 16.6667C32.0966 16.6667 32.2943 16.7467 32.4532 16.9067C32.6121 17.0667 32.6916 17.2645 32.6916 17.5V30.6417C32.6916 31.3817 32.4282 32.015 31.9016 32.5417C31.3738 33.0695 30.7399 33.3333 29.9999 33.3333H8.71657ZM28.9766 10.3833H26.4766C26.2399 10.3833 26.0416 10.3039 25.8816 10.145C25.7216 9.98612 25.6421 9.78779 25.6432 9.55001C25.6432 9.31334 25.7227 9.11557 25.8816 8.95668C26.0416 8.79779 26.2399 8.71834 26.4766 8.71834H28.9766V6.21834C28.9766 5.98168 29.0566 5.7839 29.2166 5.62501C29.3755 5.46501 29.5732 5.38501 29.8099 5.38501C30.0466 5.38501 30.2443 5.46501 30.4032 5.62501C30.5632 5.7839 30.6432 5.98168 30.6432 6.21834V8.71834H33.1432C33.3788 8.71834 33.5766 8.79834 33.7366 8.95834C33.8966 9.11834 33.9766 9.31612 33.9766 9.55168C33.9766 9.78834 33.8966 9.98612 33.7366 10.145C33.5766 10.305 33.3788 10.385 33.1432 10.385H30.6432V12.885C30.6432 13.1206 30.5632 13.3183 30.4032 13.4783C30.2432 13.6383 30.0449 13.7183 29.8082 13.7183C29.5716 13.7183 29.3738 13.6383 29.2149 13.4783C29.056 13.3183 28.9766 13.1206 28.9766 12.885V10.3833ZM18.0466 26.73L15.6666 23.855C15.5221 23.6972 15.3482 23.6183 15.1449 23.6183C14.9416 23.6183 14.7671 23.7083 14.6216 23.8883L12.6982 26.4217C12.5193 26.6572 12.4943 26.8961 12.6232 27.1383C12.7521 27.3795 12.9466 27.5 13.2066 27.5H25.7699C26.0277 27.5 26.2216 27.3795 26.3516 27.1383C26.4805 26.8961 26.466 26.6572 26.3082 26.4217L22.9416 21.9C22.7971 21.7211 22.6177 21.6317 22.4032 21.6317C22.1899 21.6317 22.0099 21.7239 21.8632 21.9083L18.0449 26.73H18.0466Z"
          fill="#2B2A29"
        />
      </svg>
    );
  }
