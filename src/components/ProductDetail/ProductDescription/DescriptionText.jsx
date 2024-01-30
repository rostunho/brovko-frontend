import styles from './Description.module.scss';

export default function DescriptionText({ product, isExpandedDescription }) {
  return (
    <>
      {isExpandedDescription ? (
        // Отримання опису з продукту, коли розгорнуто
        <p className={styles.descriptionText}>{product.description}</p>
      ) : (
        // Відображення скороченого опису, коли згорнуто
        <p className={styles.descriptionText}>
          {product.description.slice(0, 20)}
        </p>
      )}
    </>
  );
}
