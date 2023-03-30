import styles from './home.module.scss';

import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const navigate = useNavigate();

  const onRulesSelect = () => {
    navigate('/rules');
  };

  const onPlaySelect = () => {
    navigate('/play');
  };

  return (
    <div className={styles['container']}>
        <p>Test your search-fu skills with Elasticsearch!</p>
          <div className={styles['buttons']}>
            <button className={styles['rules-button']} onClick={onRulesSelect}>Rules</button>
            <button className={styles['play-button']} onClick={onPlaySelect}>Play now!</button>
          </div>
          
          <div className={styles['pac-man-border']}>
            <img className={styles['es-logo']} alt="Elasticsearch logo" src="elastic-search-logo-color-64px.svg" />
            <img className={styles['splash-image']} alt="Man with Magnifying Glass" src="splash.webp" />
          </div>
    </div>
  );
}

export default Home;
