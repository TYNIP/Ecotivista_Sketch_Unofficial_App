import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {getData} from '../../api/datahooks/profile';
import dateTransform from '../../api/utils/dateTransform';
import SocialMedia from '../../../components/ui/SocialMedia';

/* export default function ProfilePage() {
    const [users, setUsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getData();
                setUsers(data.users);
            } catch (err) {
                console.log('error', err);
                setError(err.message);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={styles.mainCenter}>
      <h1>Profile</h1>
      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr>
              <th colSpan="4" className='t'>Información de Usuario</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Email</th>
              <th>Creado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{dateTransform(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    );
}
 */

import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      {/* Cover photo */}
      <div className={styles.coverPhoto}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnmGpWbfYyZNikb7ZQNPe2trzc8pCgNHTn6g&s" // replace with your cover photo path
          alt="Cover"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Profile picture */}
      <div className={styles.profilePicture}>
        <img
          src="https://ih1.redbubble.net/image.5077640931.1602/raf,360x360,075,t,fafafa:ca443f4786.jpg" // replace with your profile picture path
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
