import styles from './ProductParams.module.scss';

export default function ProductParams({ params, ...props }) {
  return (
    <>
      <table className={styles.table}>
        {/* Якщо поле першого елемента масиву "Заголовок :" рендеримо поле заголовків*/}
        {params && params[0].key === 'Заголовок :' && (
          <thead styles={styles['t-head']}>
            <tr className={styles['t-title']}>
              <th className={styles['t-data']}>{params[0].value}</th>
            </tr>
          </thead>
        )}
        <tbody className={styles['t-body']}>
          {params.map((param, idx) => {
            if (param.key !== 'Заголовок :') {
              return (
                <tr key={idx} className={styles['t-row']}>
                  <td>{param.key}</td>
                  <td>{param.value}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </>
  );
}
