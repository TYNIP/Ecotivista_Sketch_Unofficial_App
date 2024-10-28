import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {getData} from '../../api/datahooks/profile';
import dateTransform from '../../api/utils/dateTransform';
import SocialMedia from '../../../components/ui/SocialMedia';

import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      {/* Cover photo */}
      <div className={styles.coverPhoto}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnmGpWbfYyZNikb7ZQNPe2trzc8pCgNHTn6g&s" 
          alt="Cover"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Profile picture */}
      <div className={styles.profilePicture}>
        <img
          src="https://ih1.redbubble.net/image.5077640931.1602/raf,360x360,075,t,fafafa:ca443f4786.jpg" 
          alt="Profile"
          width={160}
          height={160}
          className={styles.profileImg}
        />
      </div>

      <div className={styles.secContainer}>
        <div className={styles.info}>
          {/* User Info */}
          <div className={styles.userInfo}>
            <h1 className={styles.username}>TYNIP</h1>
          </div>

          {/* Summary Section */}
          <div className={styles.summarySection}>
            <p className={styles.summary}>
            Software and Mechatronic Junior @TEC CCM | "My vision is to empower people to engage in sustainability and social impact projects, fostering a more united community where every voice matters. Where there’s a dream of change, there’s a future."
            </p>
          </div>
        </div>
        <div className={styles.media}>
          <SocialMedia/>
        </div>
      </div>

    </div>
  );
}
