import { ElasticQueryType } from '../../util/elasticsearch';
import { BadgeCoin } from '../badge-coin/badge-coin';
import styles from './badges.module.scss';

export interface Badge {
  name: string;
  type: ElasticQueryType;
  bonusPoints: number;
  isCollected: boolean;
}

export interface BadgesProps {
  badges: Badge[];
  isGameActive: boolean;
}

export function Badges(props: BadgesProps) {

  const noBadgesMessage = props.isGameActive ? 'None yet...' : 'Better luck next time!';

  return (
    <div className={styles['badges-container']}>
      <img className={styles['badges-main-icon']} alt='Badges:' src='certification.png' />
      <div className={styles['awarded-badges-container']}>
      {
          props.badges && props.badges.length > 0 ? props.badges.map((badge: Badge) => {
            return (
            <BadgeCoin key={badge.type} badge={badge}/>
            );
          })
          : <p className={styles['no-badges-message']}>{noBadgesMessage}</p>
        }
      </div>
    </div>
  );
}

export default Badges;
