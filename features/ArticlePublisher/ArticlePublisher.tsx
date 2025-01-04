import React, { useState, useEffect } from "react";
import styles from './CreateArticle.module.scss';
import { useAuth } from '../../pages/api/context/AuthContext';
import Alert from "@/components/ui/alert";

const CreateArticle = () => {
  const { username } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState(""); 
  const [tags, setTags] = useState<string[]>([]); 
  const [sections, setSections] = useState<any[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [charCount, setCharCount] = useState(0); 
  const [alertData, setAlertData] = useState({});
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setAuthor(username);
  }, [username]);

  const handleAddSection = (type: string) => {
    const imageCount = sections.filter(section => section.type === "image").length;
    if (type === "image" && imageCount >= 2) return;

    setSections([...sections, { type, content: "" }]);
  };

  const handleUpdateSection = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateSection(index, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const updatedSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < sections.length) {
      [updatedSections[index], updatedSections[newIndex]] = [updatedSections[newIndex], updatedSections[index]];
      setSections(updatedSections);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  const handleAddTag = (tag: string) => {
    if (tags.length < 10 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    const data = { title, author, description, tags, sections };
    try {
      const response = await fetch("/api/articles/user/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertData({ status: "success", message: "Article successfully saved" });
        setTitle("");
        setDescription("");
        setTags([]);
        setSections([]);
        setCharCount(0);
      } else {
        setAlertData({ status: "error", message: "Missing fields" });
        setCounter(counter + 1);
      }
    } catch (err) {
      setAlertData({ status: "error", message: `${err}` });
    }
  };

  const imageCount = sections.filter(section => section.type === "image").length;

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Alert status={alertData.status} message={alertData.message} count={counter} />

        <input
          type="text"
          className={styles.titleInput}
          placeholder="Enter article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.descriptionInput}
          placeholder="Write a short description (max 500 characters)..."
          value={description}
          maxLength={500}
          onChange={(e) => {
            setDescription(e.target.value);
            setCharCount(e.target.value.length);
          }}
        />
        <p className={styles.descriptionHint}>
          This description is important for SEO. Characters left: {500 - charCount}
        </p>

        <div className={styles.tagsInput}>
          <input
            type="text"
            placeholder="Add a tag..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const newTag = e.currentTarget.value.trim();
                if (newTag) {
                  handleAddTag(newTag);
                  e.currentTarget.value = "";
                }
              }
            }}
          />
          <div className={styles.tagsList}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)}>&times;</button>
              </span>
            ))}
          </div>
          <p>Up to 10 tags are allowed.</p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            {section.type === "text" && (
              <textarea
                value={section.content}
                onChange={(e) => handleUpdateSection(index, e.target.value)}
                placeholder="Write your text..."
              />
            )}

            {section.type === "image" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                />
                {section.content && (
                  <img src={section.content} alt="Preview" className={styles.imagePreview} />
                )}
              </div>
            )}

            <div className={styles.actions}>
              <button onClick={() => handleMoveSection(index, "up")}>Move Up</button>
              <button onClick={() => handleMoveSection(index, "down")}>Move Down</button>
              <button onClick={() => handleRemoveSection(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sidebar}>
        <button onClick={() => handleAddSection("text")}>Add Text</button>
        <button
          onClick={() => handleAddSection("image")}
          disabled={imageCount >= 2}
          title={imageCount >= 2 ? "You can only add up to 2 images" : ""}
        >
          Add Image
        </button>
        <button onClick={() => handleAddSection("video")}>Add YouTube Video</button>
        <button onClick={handlePreview}>Preview Article</button>
        <button onClick={handleSubmit}>Submit Article</button>
      </div>

      {isPreviewOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{title}</h2>
            <p>{description}</p>
            {sections.map((section, index) => (
              <div key={index} className={styles.previewSection}>
                {section.type === "text" && <p>{section.content}</p>}
                {section.type === "image" && <img src={section.content} alt="Article Image" />}
              </div>
            ))}
            <button onClick={handlePreview} className={styles.closeButton}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateArticle;
