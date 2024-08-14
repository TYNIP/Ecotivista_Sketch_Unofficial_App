import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {getData} from '../../api/datahooks/profile';
import dateTransform from '../../api/utils/dateTransform';

export default function ProfilePage() {
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
              <th colSpan="4" className='t'>Profile Information</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Email</th>
              <th>Created</th>
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
