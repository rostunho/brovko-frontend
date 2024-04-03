import StarEmpty from 'shared/icons/StarEmpty';
import styles from './Raiting.module.scss';

export default function Raiting () {
    return (
        <>
            <div className={styles.rating}>
                <StarEmpty />
                <StarEmpty />
                <StarEmpty />
                <StarEmpty />
                <StarEmpty />
              </div>
        </>
    )
}