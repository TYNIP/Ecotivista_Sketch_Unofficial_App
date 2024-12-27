import { useState, useMemo } from "react";
import styles from "./index.module.scss";
import SocialMedia from "../../../components/ui/SocialMedia";
import { useAuth } from "../../api/context/AuthContext";
import {getCookie} from "../../api/functions/getCookie";
import Image from "next/image";
const defCover = require("../../../public/assets/default_coverpage.jpg");
const defProfile = require("../../../public/assets/default_profilepicture.jpg");
import {Loader} from "../../../components/loader/index";

export default function ProfilePage() {
  const { username } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defProfile);
  const [coverPhoto, setCoverPhoto] = useState(defCover);
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yt, setYt] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [loading, setLoading] = useState(false);

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);


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

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("linkedIn", linkedIn);
    formData.append("instagram", instagram);
    formData.append("yt", yt);
    formData.append("tiktok", tiktok);
    if (newProfilePicture) formData.append("profilePicture", newProfilePicture);
    if (newCoverPhoto) formData.append("coverPhoto", newCoverPhoto);

    try {
      const token = getCookie()
      console.log(formData, newProfilePicture, newCoverPhoto)
      await fetch(`/api/user/update`,{
        method: "POST",
        headers: {
            token: token.cookie || undefined
        },
        body: formData
    });
      setEditMode(false);
      setLoading(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Un Error Ocurrio. Vuelvalo a interntar más tarde.")
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setNewProfilePicture(null);
    setNewCoverPhoto(null);
  };

  return (
    <div className={styles.container}>
      {loading? (<div id='coverLoader'><Loader/> <Loader/></div>):(<></>)}

    <div className={`${styles.coverPhoto} ${editMode && newCoverPhoto ? styles.editPreview : ""}`}>
      {editMode ? (
        <>
          <Image
            src={newCoverPhoto ? URL.createObjectURL(newCoverPhoto) : coverPhoto}
            alt="Cover Page Preview"
            width={"100"}
            height={"100"}
          />
          <input
            type="file"
            onChange={(e) => setNewCoverPhoto(e.target.files[0])}
          />
        </>
      ) : (
        <Image src={coverPhoto} alt="Cover Page" width={"100"} height={"100"} />
      )}
    </div>

    <div className={`${styles.profilePicture} ${editMode && newProfilePicture ? styles.editPreview : ""}`}>
      {editMode ? (
        <>
          <Image
            src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : profilePicture}
            alt="Profile Picture Preview"
            width={"100"}
            height={"100"}
          />
          <input
            type="file"
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
          />
        </>
      ) : (
      <Image src={profilePicture} alt="Profile" width={"100"} height={"100"} />
      )}
    </div>


      <div className={styles.secContainer}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <h1>{username}</h1>
          </div>

          <div className={styles.summarySection}>
            {editMode ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p>{(description === undefined || description ==='undefined')? "Escribe algo sobre ti aqui. Quién eres? Qué es lo que haces? ...":description}</p>
            )}
          </div>
        </div>

        <div className={styles.media}>
          {editMode ? (
            <>
            <p>Usuario</p>
              <input
                placeholder="LinkedIn (Ej: in/username/)"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
              <input
                placeholder="Instagram (Ej: ecotivista_/)"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <input
                placeholder="YouTube"
                value={yt}
                onChange={(e) => setYt(e.target.value)}
              />
              <input
                placeholder="TikTok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </>
          ) : (
            <div>
              <SocialMedia links={{ linkedIn, instagram, yt }} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        {editMode ? (
          <>
            <button onClick={handleSave} className={styles.secondaryButton}>Save Changes</button>
            <button onClick={handleCancel} className={styles.secondaryButton}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className={styles.primaryButton}>Edit Mode</button>
        )}
      </div>
    </div>
  );
}
