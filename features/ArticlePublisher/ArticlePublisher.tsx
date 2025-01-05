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

  // Limit for the title and subtitle characters
  const MAX_TITLE_LENGTH = 50;
  const MAX_SUBTITLE_LENGTH = 50;

  useEffect(() => {
    setAuthor(username);
  }, [username]);

  // Handle adding sections to the article
  const handleAddSection = (type: string) => {
    if (type === "image" && sections.filter(s => s.type === "image").length >= 2) {
      setAlertData({ status: "error", message: "Solo se pueden agregar dos imagenes por articulo" });
      setCounter(counter + 1);
      return;
    }
    setSections([...sections, { type, content: "" }]);
  };

  // Handle updating content of each section
  const handleUpdateSection = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  // Handle image upload
  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateSection(index, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle removing a section
  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  // Handle moving sections up or down
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
        setAlertData({ status: "success", message: "Article saved successfully" });
        setTitle("");
        setDescription("");
        setTags([]);
        setSections([]);
        setCharCount(0);
      } else {
        //@ts-ignore
        setAlertData({ status: "error", message: "Missing field" });
        setCounter(counter + 1);
      }
    } catch (err) {
      setAlertData({ status: "error", message: `${err}` });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        {/* Title input */}
        <Alert status={alertData.status} message={alertData.message} count={counter} />
        
        <p>TITULO: Caracteres disponibles: {MAX_TITLE_LENGTH - title.length}</p>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Titulo del articulo..."
          value={title}
          onChange={(e) => {
            if (e.target.value.length <= MAX_TITLE_LENGTH) {
              setTitle(e.target.value);
            }
          }}
        />

        {/* Description input */}
        <p className={styles.descriptionHint}>
          DESCRIPCIÓN: Caracteres disponibles: {500 - charCount}
        </p>
        <textarea
          className={styles.descriptionInput}
          placeholder="Escribe una descripción corta pero concisa (max 500 caracteres)..."
          value={description}
          maxLength={500}
          onChange={(e) => {
            setDescription(e.target.value);
            setCharCount(e.target.value.length);
          }}
        />

        {/* Tags input */}
        <p>TAGS: Puedes agregar hasta 10 tags</p>
        <div className={styles.tagsInput}>
          <input
            type="text"
            placeholder="Agregar tag..."
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
        </div>

        {/* Article Sections */}
        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            {section.type === "text" && (
              <textarea
                value={section.content}
                onChange={(e) => handleUpdateSection(index, e.target.value)}
                placeholder="Escribe un texto..."
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

            {section.type === "video" && (
              <div>
                <input
                  type="url"
                  value={section.content}
                  onChange={(e) => handleUpdateSection(index, e.target.value)}
                  placeholder="Youtube Video URL (Ej: https://www.youtube.com/watch?v=id)"
                />
                {section.content && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${section.content.split("v=")[1]}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allowFullScreen
                    className={styles.videoPreview}
                  ></iframe>
                )}
              </div>
            )}

            {section.type === "subtitle" && (
              <div>
                <input
                  type='text'
                  value={section.content}
                  onChange={(e) => handleUpdateSection(index, e.target.value)}
                  placeholder="Escribe un subtitulo..."
                  maxLength={MAX_SUBTITLE_LENGTH}
                />
                <p>Caracteres restantes del subtitulo: {MAX_SUBTITLE_LENGTH - section.content.length}</p>
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

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <button onClick={() => handleAddSection("text")}>Add Text</button>
        <button onClick={() => handleAddSection("image")}>Add Image</button>
        <button onClick={() => handleAddSection("video")}>Add YouTube Video</button>
        <button onClick={() => handleAddSection("subtitle")}>Add Subtitle</button>
        <button onClick={handlePreview}>Preview Article</button>
        <button onClick={handleSubmit}>Submit Article</button>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{title}</h2>
            <p>{description}</p>
            {sections.map((section, index) => (
              <div key={index} className={styles.previewSection}>
                {section.type === "text" && <p>{section.content}</p>}
                {section.type === "image" && <img src={section.content} alt="Article Image" />}
                {section.type === "video" && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${section.content.split("v=")[1]}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
                {section.type === "subtitle" && <p>{section.content}</p>}
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
