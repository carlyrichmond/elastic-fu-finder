import styles from './index.module.scss';

import Link from 'next/link';

/* eslint-disable-next-line */
export interface RulesProps {}

export function Rules(props: RulesProps) {
  return (
    <div className={styles['container']}>
      <h1>How to Play</h1>
      <p>Welcome to Elastic-Fu Finder! The fun way to test your search-fu skills using Elasticsearch.</p>
      <h2>Rules</h2>
      <p>Players have 3 minutes to find as many pages as they can.</p>
      <p>They are presented with a screenshot of a sample document that they need to find using search terms of their choice. Elasticsearch returns the first 10 results by default, so points are only awarded when the desired document is found in the first 10 results. Bonus points are also awarded for top 3 and the top position.</p>
      <Link href='/'>Home</Link>
      <Link href='/play'>Start</Link>
    </div>
  );
}

export default Rules;
