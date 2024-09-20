import styles from './styles.module.scss';

export const Loader = ({ size=25 } : { size?: number })=>{
    return(
        <section className={styles.dotsContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </section>
    )
}
//<div style={{width: size, height: size}} className={styles.loader}></div>