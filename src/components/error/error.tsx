import { useNavigate } from 'react-router-dom';
import styles from './error.module.scss';

export function Error() {
  const navigate = useNavigate();

  const onPlaySelect = () => {
    navigate('/play');
  }

  const onReportSelect = () => {
    window.location.href = 'https://github.com/carlyrichmond/elastic-fu-finder/issues/new';
  }

  return (
    <div className={styles['container']}>
      <p className={styles['error-paragraph']} data-testid="error-paragraph">
        Oh No! Something's wrong!
      </p>
      
      <div className={styles['image-container']}>
        <img className={styles['whoops-image']} src='elastic-search-logo-color-64px.svg' alt='Elasticsearch'/>
        <img className={styles['whoops-image']} src='pacman-gameover.png' alt='Pac Man Ghosts and Cherries'/>
      </div>

      <div className={styles['button-container']}>
      <button
          data-testid='play-button'
          className={styles['primary-button']}
          onClick={onPlaySelect}>
          Try again!
        </button>
        <button
          data-testid='issue-button'
          className={styles['secondary-button']}
          onClick={onReportSelect}>
          Report issue
        </button>
      </div>
    </div>
  );
}

export default Error;
