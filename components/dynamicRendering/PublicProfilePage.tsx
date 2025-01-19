import styles from "./index.module.scss";
import SocialMedia from "../../components/ui/SocialMedia";
import UserArticles from "@/components/articles/user";
import Image from "next/image";
import { useRouter } from 'next/router'
const defCover = require("@/public/assets/default_coverpage.jpg");
const defProfile = require("@/public/assets/default_profilepicture.jpg");
import {cleanPathName} from "../functions";

export default function PublicProfilePage({ userData }:any) {
  const router = useRouter()
  const {
    username = "Usuario desconocido",
    profilePicture = defProfile,
    coverPhoto = defCover,
    description = "Parece estar muy vacio por aqui . . .",
    socialMedia = {},
    _id,
  } = userData;

  return (
    <div className={styles.container}>
      {/* Cover Photo */}
      <div className={styles.coverPhoto}>
        <Image src={coverPhoto || defCover} alt="Cover Page" width={"1000"} height={"1000"} />
      </div>

      {/* Profile Picture */}
      <div className={styles.profilePicture}>
        <Image src={profilePicture || defProfile} alt="Profile Picture" width={"1000"} height={"1000"} />
      </div>

      <div className={styles.secContainer}>
        {/* User Information */}
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <h1>{username}</h1>
          </div>

          {/* User Description */}
          <div className={styles.summarySection}>
            <p>{description}</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={styles.media}>
          <SocialMedia links={socialMedia} user={username}/>
        </div>
      </div>

      {/* Articles */}
      <div>
        <UserArticles id={_id} numberOfArticles={6} />
        <div className={styles.buttons}>
          <button onClick={() => router.push(`/users/${cleanPathName(username)}/articles`)} className={styles.primaryButton}>
            Más Articulos
          </button>
        </div>
      </div>
    </div>
  );
}
