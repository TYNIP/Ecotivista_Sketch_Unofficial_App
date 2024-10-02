// src/components/PublishArticle.js
import React, { useState } from 'react';
import axios from 'axios';
/* import style from './'; */

const PublishArticle = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('project');
  const [tags, setTags] = useState([]);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [footerHtml, setFooterHtml] = useState('');

  const handleAddContentBlock = (blockType) => {
    setContentBlocks([...contentBlocks, { type: blockType, content: '', src: '', alt: '', url: '', footerHtml: '' }]);
  };

  const handleContentChange = (index, field, value) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index][field] = value;
    setContentBlocks(updatedBlocks);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Backspace' && e.target.value) {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const handleDeleteContentBlock = (index) => {
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updatedBlocks);
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleContentChange(index, 'src', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty content blocks to avoid sending incomplete data
    const filteredContentBlocks = contentBlocks.filter(block => block.type !== '' || block.content !== '' || block.src !== '' || block.url !== '' || block.footerHtml !== '');
  
    const newArticle = { title, author, type, tags, content: filteredContentBlocks };
  
    try {
      await axios.post('http://localhost:5000/articles', newArticle);
      // Reset form after submission
      setTitle('');
      setAuthor('');
      setType('project');
      setTags([]);
      setContentBlocks([]);
      setFooterHtml('');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="publish-article">
      <form onSubmit={handleSubmit}>
        <h2>Nuevo Articulo a Publicar</h2>
        <div>
          <label>Titulo: </label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Autor: </label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Tipo de Articulo: </label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="independent">Independiente</option>
            <option value="group">Grupo</option>
          </select>
        </div>
        <div>
          <label>Tags</label>
          <input type="text" onKeyUp={(e)=>handleAddTag(e)} placeholder="Presionar enter para agregar un tag" />
          <div>{tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}</div>
          
        </div>
        <div>
          <h3>Contenido del Articulo</h3>
          <br/>
          <button type="button" onClick={() => handleAddContentBlock('text')}>Agregar Texto</button>
          <button type="button" onClick={() => handleAddContentBlock('image')}>Agregar una Imagen</button>
          <button type="button" onClick={() => handleAddContentBlock('subtitle')}>Agregar un Subtitulo</button>
          <button type="button" onClick={() => handleAddContentBlock('actionButton')}>Agregar un boton de acción</button>
          <button type="button" onClick={() => handleAddContentBlock('quote')}>Agregar una cita</button>
          <button type="button" onClick={() => handleAddContentBlock('footer')}>Agregar codigo</button>
          {contentBlocks.map((block, index) => (
            <div key={index} className="content-block">
              <h4>{block.type}</h4>
              {block.type === 'text' && (
                <textarea value={block.content} onChange={(e) => handleContentChange(index, 'content', e.target.value)} />
              )}
              {block.type === 'image' && (
                <>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
                  {block.src && <img src={block.src} alt="Preview" style={{ maxWidth: '100px' }} />}
                </>
              )}
              {block.type === 'subtitle' && (
                <input type="text" value={block.content} onChange={(e) => handleContentChange(index, 'content', e.target.value)} />
              )}
              {block.type === 'actionButton' && (
                <>
                  <input type="text" placeholder="Button Text" value={block.content} onChange={(e) => handleContentChange(index, 'content', e.target.value)} />
                  <input type="text" placeholder="URL" value={block.url} onChange={(e) => handleContentChange(index, 'url', e.target.value)} />
                </>
              )}
              {block.type === 'quote' && (
                <textarea value={block.content} onChange={(e) => handleContentChange(index, 'content', e.target.value)} />
              )}
              {block.type === 'footer' && (
                <textarea value={block.footerHtml} onChange={(e) => handleContentChange(index, 'footerHtml', e.target.value)} />
              )}
              <button type="button" onClick={() => handleDeleteContentBlock(index)}>Borrar</button>
            </div>
          ))}
        </div>
        <button type="submit" style={{'background': 'blue', color: 'white'}}>Publicar Articulo</button>
      </form>
      <div className="preview">
        <h2>Preview</h2>
        <div className="article-detail">
          <h1>{title}</h1>
          <p>by {author}</p>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="content">
            {contentBlocks.map((block, index) => (
              <div key={index} className={`content-block ${block.type}`}>
                {block.type === 'text' && <p>{block.content}</p>}
                {block.type === 'image' && block.src && (
                  <img src={block.src} alt={block.alt} />
                )}
                {block.type === 'subtitle' && <h2>{block.content}</h2>}
                {block.type === 'actionButton' && (
                  <button>{block.content}</button>
                )}
                {block.type === 'quote' && <blockquote>"{block.content}"</blockquote>}
                {block.type === 'footer' && (
                  <div dangerouslySetInnerHTML={{ __html: block.footerHtml }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishArticle;