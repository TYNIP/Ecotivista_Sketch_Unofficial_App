import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import SocialMedia from "../../../components/ui/SocialMedia";
import { useAuth } from "../../api/context/AuthContext";
import axios from "axios";

export default function ProfilePage() {
  const { username, email } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [likedIn, setLikedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yt, setYt] = useState("");

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    async function fetchData() {
      const { data } = await axios.get("/api/user/profile");
      setProfilePicture(data.profilePicture);
      setCoverPhoto(data.coverPhoto);
      setDescription(data.description);
      setLikedIn(data.likedIn);
      setInstagram(data.instagram);
      setYt(data.yt);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("likedIn", likedIn);
    formData.append("instagram", instagram);
    formData.append("yt", yt);
    if (newProfilePicture) formData.append("profilePicture", newProfilePicture);
    if (newCoverPhoto) formData.append("coverPhoto", newCoverPhoto);

    try {
      await axios.post("/api/user/update", formData);
      setEditMode(false);
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
          <img src={coverPhoto} alt="Cover" />
        )}
      </div>

      <div className={styles.profilePicture}>
        {editMode ? (
          <input
            type="file"
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
          />
        ) : (
          <img src={profilePicture} alt="Profile" />
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
              <p>{description}</p>
            )}
          </div>
        </div>

        <div className={styles.media}>
          {editMode ? (
            <>
              <input
                placeholder="LinkedIn"
                value={likedIn}
                onChange={(e) => setLikedIn(e.target.value)}
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
            <SocialMedia links={{ likedIn, instagram, yt }} />
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
