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
        <h1>Test your search-fu skills with 
          <img className={styles['es-logo']} alt="Elasticsearch logo" src="elastic-search-logo-color-64px.svg" /> Elasticsearch!</h1>
          <div className={styles['buttons']}>
            <button className={styles['rules-button']} onClick={onRulesSelect}>Rules</button>
            <button className={styles['play-button']} onClick={onPlaySelect}>Play now!</button>
          </div>
          <img className="splash-image" alt="Man with Magnifying Glass" src="splash.webp" />
    </div>
  );
}

export default Home;
