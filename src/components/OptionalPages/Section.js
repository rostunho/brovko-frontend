import styles from './OptionPages.module.scss'

function Section({ title, content }) {
    return (
      <section className={styles.section}>
        <h3 className={styles.title}>{title}</h3>
        <div>
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    );
  }

  export default Section;