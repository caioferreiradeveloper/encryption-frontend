// React imports
import React from 'react';

// Interface imports
import type { SectionTitleProps } from './interfaces';

// Style imports
import styles from './SectionTitle.module.scss';


// SectionTitle Component
const SectionTitle: React.FC<SectionTitleProps> = ({ text, Icon }) => {

  // Return Component
  return (
    <div className={styles.sectionTitle}>

      {/* Icon */}
      {Icon && <Icon style={{ fontSize: '1.5rem'}}></Icon>}

      {/* Main text */}
      <h2 className={styles.mainText}>{text}</h2>

    </div>
  );
};

// Export SectionTitle
export default SectionTitle;