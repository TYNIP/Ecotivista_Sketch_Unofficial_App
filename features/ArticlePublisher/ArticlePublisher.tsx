import React, { useState } from "react";
import styles from './CreateArticle.module.scss';

const CreateArticle = () => {
  const [title, setTitle] = useState(""); // Title for the article
  const [sections, setSections] = useState<any[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State for preview modal

  // Handle section addition (text, image, video)
  const handleAddSection = (type: string) => {
    setSections([...sections, { type, content: "" }]);
  };

  // Handle section updates (text, image, video)
  const handleUpdateSection = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  // Handle image upload
  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateSection(index, reader.result as string); // Save image as Base64 string
    };
    reader.readAsDataURL(file); // Convert to Base64 for preview
  };

  // Remove section
  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  // Move section (up or down)
  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const updatedSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < sections.length) {
      [updatedSections[index], updatedSections[newIndex]] = [updatedSections[newIndex], updatedSections[index]];
      setSections(updatedSections);
    }
  };

  // Open/Close preview modal
  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  // Submit the article
  const handleSubmit = async () => {
    const data = { title, sections };
    
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Article saved!");
    } else {
      console.error("Error saving the article");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        {/* Title input */}
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Enter article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Article Sections */}
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

            {section.type === "video" && (
              <div>
                <input
                  type="url"
                  value={section.content}
                  onChange={(e) => handleUpdateSection(index, e.target.value)}
                  placeholder="Paste YouTube video URL..."
                />
                {section.content && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${section.content.split("v=")[1]}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoPreview}
                  ></iframe>
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

      {/* Sidebar to add sections */}
      <div className={styles.sidebar}>
        <button onClick={() => handleAddSection("text")}>Add Text</button>
        <button onClick={() => handleAddSection("image")}>Add Image</button>
        <button onClick={() => handleAddSection("video")}>Add YouTube Video</button>

        {/* Preview Article Button */}
        <button onClick={handlePreview}>Preview Article</button>

        <button onClick={handleSubmit}>Submit Article</button>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{title}</h2>

            {sections.map((section, index) => (
              <div key={index} className={styles.previewSection}>
                {section.type === "text" && <p>{section.content}</p>}
                {section.type === "image" && <img src={section.content} alt="Article Image" className={styles.imagePreview} />}
                {section.type === "video" && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${section.content.split("v=")[1]}`}
                    title="YouTube video preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ))}

            <button onClick={handlePreview} className={styles.closeButton}>Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateArticle;
