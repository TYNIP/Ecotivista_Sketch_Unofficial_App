import UserArticles from "@/components/articles/user";
import styles from '@/styles/index.module.scss';
import Link from 'next/link';
import { cleanPathName } from "@/components/functions";

export async function getServerSideProps(context:any) {
  try {
      const { username } = context.params;
      const host = context.req.headers.host;
      const protocol = context.req.headers["x-forwarded-proto"] || "http";
      const baseUrl = `${protocol}://${host}`;
      const userClean = cleanPathName(username);
      
      const res = await fetch(`${baseUrl}/api/social/users?username=${userClean}`);

      if (res.status !== 200) {
          console.error(`API request failed with status: ${res.status}`);
          return {
              props: {
                  data: { userId: null, username: userClean },
              },
          };
      }

      const userData = await res.json();

      return {
          props: {
              data: { userId: userData._id || null, username: userClean },
          },
      };
  } catch (err) {
      console.error("Error in getServerSideProps:", err);
      return {
          props: {
              data: { userId: null, username: null },
          },
      };
  }
}


export default function UserProfile({ data }:any) {
    return (
        <section className={styles.generalContainer}>
            <section className={styles.mainContent}>
                <h2>Articulos de <Link href={`/users/${cleanPathName(data.username)}`}>{data.username.replace("-"," ")}</Link></h2>
            </section>
            
            <UserArticles id={data.userId}/>
        </section>
    );
}
 