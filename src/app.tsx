// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';

import Game from './components/game/game';
import Home from './components/home/home';
import Rules from './components/rules/rules';

export function App() {
  return (
    <>
      <header>
        <img
          className={styles['elastic-logo']}
          alt="Elastic Logo"
          src="logo-elastic-horizontal-color-reverse.svg"
        />
        <h1 className={styles['games-title']}>
        <a href='/'>Fu-Finder</a></h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </main>
      <footer>
        Made by Carly Richmond{' '}
        <span aria-label="avocado" role="img">
          &#x1f951;
        </span>{' '}
        with{' '}
        <span aria-label="heart" role="img">
          &#x1F49C;
        </span>{' '}
        and{' '}
        <span aria-label="heart" role="img">
          &#x1f375;
        </span>
      </footer>
    </>
  );
}

export default App;
