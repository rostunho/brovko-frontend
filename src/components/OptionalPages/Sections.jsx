import styles from './OptionalPages.module.scss'

function Section({ title, content }) {
    return (
      <section className={styles.section}>
        <h3 className={styles.title}>{title}</h3>
        <div>
          {content.map((paragraph, index) => (
            <div key={index}>{paragraph}</div>
          ))}
        </div>
      </section>
    );
  }

  export default Section;