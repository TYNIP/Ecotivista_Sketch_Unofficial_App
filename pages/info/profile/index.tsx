import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SocialMedia from "../../../components/ui/SocialMedia";
import { useAuth } from "../../api/context/AuthContext";
import axios from "axios";
import {getCookie} from "../../api/functions/getCookie";
import Image from "next/image";
const defCover = require("../../../public/assets/default_coverpage.jpg");
const defProfile = require("../../../public/assets/default_profilepicture.jpg");

export default function ProfilePage() {
  const { username } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defProfile);
  const [coverPhoto, setCoverPhoto] = useState(defCover);
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yt, setYt] = useState("");

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
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("linkedIn", linkedIn);
    formData.append("instagram", instagram);
    formData.append("yt", yt);
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
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setNewProfilePicture(null);
    setNewCoverPhoto(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverPhoto}>
        {editMode ? (
          <input
            type="file"
            onChange={(e) => setNewCoverPhoto(e.target.files[0])}
          />
        ) : (
          <Image src={coverPhoto} alt="Cover Page" width={"100"} height={"100"}/>
        )}
      </div>

      <div className={styles.profilePicture}>
        {editMode ? (
          <input
            type="file"
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
          />
        ) : (
          <Image src={profilePicture} alt="Profile" width={"100"} height={"100"}/>
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
              <input
                placeholder="LinkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
              <input
                placeholder="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <input
                placeholder="YouTube"
                value={yt}
                onChange={(e) => setYt(e.target.value)}
              />
            </>
          ) : (
            <SocialMedia links={{ linkedIn, instagram, yt }} />
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        {editMode ? (
          <>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Mode</button>
        )}
      </div>
    </div>
  );
}
