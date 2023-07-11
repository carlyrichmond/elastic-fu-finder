import styles from './loader.module.scss';

export function Loader() {
  return (
    <div className={styles['loader']}>
      <img
        className={styles['es-logo']}
        alt="Elasticsearch logo"
        src="elastic-search-logo-color-64px.svg"
      />
      <div className={styles['circles']}>
        <span className={styles['one']}></span>
        <span className={styles['two']}></span>
        <span className={styles['three']}></span>
      </div>
    </div>
  );
}

export default Loader;
