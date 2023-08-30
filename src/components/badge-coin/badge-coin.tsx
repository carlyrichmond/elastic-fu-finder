
import { Badge } from '../badges/badges';
import styles from './badge-coin.module.scss';

export interface BadgeCoinProps {
  badge: Badge;
}

export function BadgeCoin(props: BadgeCoinProps) {
  const badgeText = props.badge.type.replace('Doc', '').replace('Query', '').replace(/[a-z]/g, '');

  return (
    <div className={styles['badges-container']} data-testid='badge-coin' title={props.badge.name}>
      <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" fill="currentColor" className={styles['bi-coin']} viewBox="0 0 16 16"> 
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="#fec513"></path> 
        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" fill="#fec513"></path> 
        <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" fontSize="0.35rem" strokeWidth="0.5px" dy=".3em">{badgeText}</text>
      </svg>
    </div>
  );
}

export default BadgeCoin;
