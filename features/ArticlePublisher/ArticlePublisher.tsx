import React, { useState, useEffect } from "react";
import styles from './CreateArticle.module.scss';
import secStyle from "@/styles/index.module.scss";
import { useAuth } from '../../pages/api/context/AuthContext';
import Alert from "@/components/ui/alert";
import {Loader} from "@/components/loader/index";

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
  const [loading, setLoading] = useState(false);

  /* LIMITERS */
  const MAX_ARTICLE_SIZE = 5 * 1024 * 1024;
  const [articleSize, setArticleSize] = useState(0);
  const MAX_TITLE_LENGTH = 70;
  const MAX_SUBTITLE_LENGTH = 50;
  const MAX_LINKS = 2;
  const MAX_LINK_TEXT_LENGTH = 50;
  const MAX_IMAGE_WIDTH = 1920; 
  const MAX_IMAGE_HEIGHT = 1080; 
  const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

  useEffect(() => {
    setAuthor(username);
  }, [username]);

  /* Article SIZE CALCULATIONS */
  const calculateArticleSize = () => {
    let size = 0;

    // Title and description size (1 char = 2 bytes for UTF-16 encoding)
    size += title.length * 2;
    size += description.length * 2;

    // Tags size
    tags.forEach(tag => {
      size += tag.length * 2;
    });

    // Sections size
    sections.forEach(section => {
      if (section.type === "text" || section.type === "subtitle") {
        size += section.content.length * 2;
      } else if (section.type === "image" && section.content) {
        size += section.content.length * 0.75; // Base64 encoded image size approximation
      } else if (section.type === "link" && section.content) {
        size += (section.content.url.length + section.content.text.length) * 2;
      }
    });

    return size;
  };

  // Update article size whenever sections, title, or description change
  useEffect(() => {
    const newSize = calculateArticleSize();
    setArticleSize(newSize);
  }, [title, description, tags, sections]);


  // Handle adding sections to the article
  const handleAddSection = (type: string) => {
    if (type === "image" && sections.filter(s => s.type === "image").length >= 2) {
      setAlertData({ status: "error", message: "Solo se pueden agregar dos imágenes por artículo" });
      setCounter(counter + 1);
      return;
    }
    if (type === "link" && sections.filter(s => s.type === "link").length >= MAX_LINKS) {
      setAlertData({ status: "error", message: `Solo se pueden agregar ${MAX_LINKS} enlaces por artículo` });
      setCounter(counter + 1);
      return;
    }
    if (type === "spotify" && sections.filter(s => s.type === "spotify").length >= 1) {
      setAlertData({ status: "error", message: "Solo se puede agregar un enlace de Spotify por artículo" });
      setCounter(counter + 1);
      return;
    }

    const newSection = type === "link" 
      ? { type, content: { url: "", text: "" } } 
      : { type, content: "" };

      const estimatedSize = calculateArticleSize() + (type === "text" || type === "subtitle" ? 100 : 5000);
      if (estimatedSize > MAX_ARTICLE_SIZE) {
        setAlertData({ status: "error", message: "El artículo excede el tamaño máximo permitido (5 MB)." });
        setCounter(counter + 1);
        return;
      }

    setSections([...sections, newSection]);
  };

  // Handle updating content of each section
  const handleUpdateSection = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  // Handle image upload
  const handleImageUpload = (index: number, file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setAlertData({ status: "error", message: "La imagen es demasiado grande. Tamaño máximo: 1MB" });
      setCounter(counter + 1);
      return;
    }
  
    const img = new Image();
    const reader = new FileReader();
  
    reader.onload = () => {
      img.src = reader.result as string;
  
      img.onload = () => {
        if (img.width > MAX_IMAGE_WIDTH || img.height > MAX_IMAGE_HEIGHT) {
          setAlertData({
            status: "error",
            message: `Dimensiones de imagen no válidas. Máximo permitido: ${MAX_IMAGE_WIDTH} x ${MAX_IMAGE_HEIGHT} px`,
          });
          setCounter(counter + 1);
          return;
        }
  
        handleUpdateSection(index, reader.result as string);
      };
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
    setLoading(true);
    const data = { title, author, description, tags, sections };
    try {
      const response = await fetch("/api/articles/user/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertData({ status: "success", message: "Articulo Publicado Exitosamente" });
        setTitle("");
        setDescription("");
        setTags([]);
        setSections([]);
        setCharCount(0);
        setLoading(false);
      } else {
        //@ts-ignore
        setAlertData({ status: "error", message: "ALgo Salio Mal. Vuelvalo a intentar." });
        setCounter(counter + 1);
        setLoading(false);
      }
    } catch (err) {
      setAlertData({ status: "error", message: `${err}` });
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        {/* Title input */}
        
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

            {section.type === "link" && (
              <div>
                <input
                  type="url"
                  value={section.content.url}
                  onChange={(e) =>
                    handleUpdateSection(index, { ...section.content, url: e.target.value })
                  }
                  placeholder="Introduzca la URL"
                />
                <input
                  type="text"
                  value={section.content.text}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      handleUpdateSection(index, { ...section.content, text: e.target.value });
                    }
                  }}
                  maxLength={MAX_LINK_TEXT_LENGTH}
                  placeholder="Texto del botón (max 50 caracteres)"
                />

                <p>Caracteres restantes del botón: {MAX_SUBTITLE_LENGTH - section.content.text.length}</p>
              </div>
            )}

            {section.type === "spotify" && (
              <div>
                <input
                  type="url"
                  value={section.content}
                  placeholder="Spotify Embed URL Ej(show/id o artist/id)"
                  onChange={(e) => handleUpdateSection(index, e.target.value)}
                />
                {section.content && (
                  <iframe
                  src={`https://open.spotify.com/embed/${section.content}`}
                  allow="encrypted-media" 
                  title="Spotify"
                  width="560"
                  height="360"
                  frameBorder="0"
                  allowFullScreen
                  className={styles.videoPreview}
                ></iframe>
                )}
              </div>
            )}

                {/* BUTTONS MOVE SECTIONS */}
            <div className={styles.actions}>
              <button onClick={() => handleMoveSection(index, "up")}>Subir</button>
              <button onClick={() => handleMoveSection(index, "down")}>Bajar</button>
              <button onClick={() => handleRemoveSection(index)}>Borrar</button>
            </div>
          </div>
        ))}

        <Alert status={alertData.status} message={alertData.message} count={counter} />
        <p>Espacio disponible: {((MAX_ARTICLE_SIZE - articleSize) / 1024 / 1024).toFixed(2)} MB</p>

      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        {loading? (<div id='coverLoader'><Loader/> <Loader/></div>):(<></>)}
          <button onClick={() => handleAddSection("text")}>Agregar texto</button>
          <button onClick={() => handleAddSection("image")}>Agregar Imagen</button>
          <button onClick={() => handleAddSection("video")}>Agregar YouTube Video</button>
          <button onClick={() => handleAddSection("subtitle")}>Agregar Subtitulo</button>
          <button onClick={() => handleAddSection("link")}>Agregar URL</button>
          <button onClick={() => handleAddSection("spotify")}>Agregar Spotify Embed</button>
          <button onClick={handlePreview}>Vista previa</button>
          <button onClick={handleSubmit}>Publicar Articulo</button>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>

        <section className={secStyle.generalContainer}>
        <div className={secStyle.head}>
          <h1>{title}</h1>
          <p className="article-meta">
            Por <span className="article-author">{author}</span> el{" "}
            <span className="article-date">{new Date().toLocaleDateString()}</span>
          </p>
          <h3></h3>
            <p className={secStyle.description}>{description}</p>
          <h3></h3>
        </div>

        <article className={secStyle.mainContent}>
        {sections.map((section, index) => (
            <div key={index}>
              {section.type === "text" && <p>{section.content}</p>}
              {section.type === "image" && (
              <div key={index} className={secStyle.imgContainer}>
                <img
                src={section.content}
                alt={`Image`}
                className={secStyle.imgContent}
              />
              </div>
            )}
              {section.type === "video" && (
              <div key={index} className={secStyle.video}>
                <iframe
                  src={`https://www.youtube.com/embed/${section.content.split("v=")[1]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  width={"100%"}
                  height={"300px"}
                  title={`Video ${index + 1}`}
                ></iframe>
              </div>
            )}
              {section.type === "subtitle" && (
                <h3 key={index}>
                  {section.content}
                </h3>
                )}
              {section.type === "link" && (
              <div key={index} className={secStyle.buttons}>
                <a key={index} href={`${section.content.url}`} className={secStyle.primaryButton} target="_blank">{section.content.text.toUpperCase()}</a>
              </div>
            )}
              {section.type === "spotify" && (
              <iframe
                src={`https://open.spotify.com/embed/${section.content}`}
                allow="encrypted-media" 
                key={index}
                title="Spotify"
                width="560"
                height="460"
                frameBorder="0"
                allowFullScreen
                className={secStyle.spotify}
              ></iframe>
            )}

            </div>
          ))}
        </article>
        </section>

          <button onClick={handlePreview} className={styles.closeButton}>
            Cerrar Vista Previa
          </button>

        </div>
      </div>
      )}
    </div>
  );
};

export default CreateArticle;
