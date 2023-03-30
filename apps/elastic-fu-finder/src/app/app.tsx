// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';

import Game from './game/game';
import Home from './home/home';

export function App() {
  return (
    <>
    <header>
      <img className={styles['elastic-logo']} alt="Elastic Logo" src="logo-elastic-horizontal-color-reverse.svg" />
      <h1 className={styles['games-title']}>games</h1>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </main>
    <footer>
      Made by Carly Richmond with <span aria-label="heart" role="img">&#x1F49C;</span> and <span aria-label="heart" role="img">&#x1f375;</span>
    </footer>
    </>
  );
}

export default App;
