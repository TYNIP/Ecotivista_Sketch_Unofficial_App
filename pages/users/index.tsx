import { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import styles from "./index.module.scss";
import SocialMedia from "../../components/ui/SocialMedia";
import UserArticles from "@/components/articles/user";
import { useAuth } from "../api/context/AuthContext";
import {getCookie} from "../api/functions/getCookie";
import Image from "next/image";
const defCover = require("../../public/assets/default_coverpage.jpg");
const defProfile = require("../../public/assets/default_profilepicture.jpg");
import {Loader} from "../../components/loader/index";

export default function ProfilePage() {
  const { username, id } = useAuth();
  const router = useRouter()
  const [profilePicture, setProfilePicture] = useState(defProfile);
  const [coverPhoto, setCoverPhoto] = useState(defCover);
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yt, setYt] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [loading, setLoading] = useState(false);


  // Fetch user data from API
  async function fetchData() {
    try {
      const token = getCookie();
      const response = await fetch(`/api/user/profile`, {
        headers: {
          token: token?.cookie || undefined,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const user = await response.json();
      const data = user;
  
      console.log("profile data", data);
  
      // Update state variables
      setDescription(data.description);
      setLinkedIn(data.socialMedia.linkedIn);
      setInstagram(data.socialMedia.instagram);
      setYt(data.socialMedia.youtube);
      setTiktok(data.socialMedia.tiktok);
      if(data.profilePicture){
        setProfilePicture(data.profilePicture);
      };
      if(data.coverPhoto){
        setCoverPhoto(data.coverPhoto);
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  }
  

  useMemo(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);


  return (
    <div className={styles.container}>
      {loading? (<div id='coverLoader'><Loader/> <Loader/></div>):(<></>)}

    <div className={styles.coverPhoto}>
        <Image src={coverPhoto} alt="Cover Page" width={"100"} height={"100"} />
    </div>

    <div className={styles.profilePicture}>
      <Image src={profilePicture} alt="Profile" width={"100"} height={"100"} />
    </div>

      <div className={styles.secContainer}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <h1>{username}</h1>
          </div>

          <div className={styles.summarySection}>
              <p>{(description === undefined || description ==='undefined')? "Parece que nadie ha escrito nada aqui ...":description}</p>
          </div>
        </div>

        <div className={styles.media}>
            <div>
              <SocialMedia links={{ linkedIn, instagram, yt, tiktok }} />
            </div>
        </div>
      </div>

      {/* ARTICLES */}
      <div>
        <UserArticles id={id} numberOfArticles={6}/>
        <div className={styles.buttons}>
          <button onClick={() => router.push("/info/articles")} className={styles.primaryButton}>Más Articulos</button>
        </div>
      </div>
    </div>
  );
}
