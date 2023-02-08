import styles from './index.module.scss';

import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';
import Timer from '../components/timer/timer';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      <Head>
        <title>Elastic-Fu Finder</title>
      </Head>
      <div className={styles.page}>
        <div className="wrapper">
          <div className="container">
            <div id="welcome">
              <h1>
                Elastic-Fu Finder
                <span> Build your Search-fu with Elastic </span>
              </h1>
              <h2><Link href='/rules'>How to play!</Link></h2>
            </div>
            <Timer/>
            <Image src="/../public/images/screenshots/63d2b84f1238d175ca387fb4.png" 
            width="600" height="500" alt="My First Screenshot"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
