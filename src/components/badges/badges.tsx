import styles from './badges.module.scss';

export interface Badge {
  name: string;
  imagePath: string;
  bonusPoints: number;
  isCollected: boolean;
}

export interface BadgesProps {
  badges: Badge[];
}

export function Badges(props: BadgesProps) {
  return (
    <div className={styles['badges-container']}>
      <img className={styles['badges-main-icon']} alt='Badges:' src='certification.png' />
      <div className={styles['awarded-badges-container']}>
      {
          props.badges && props.badges.length > 0 ? props.badges.map((badge: Badge) => {
            const imagePath = badge.imagePath ? badge.imagePath: 'certification.png';
            return (
            <img data-testid='badge-img' className={styles['badge-icon']} 
                  alt={badge.name} title={badge.name} src={imagePath} />
            );
          })
          : <p className={styles['no-badges-message']}>Better luck next time!</p>
        }
      </div>
    </div>
  );
}

export default Badges;
