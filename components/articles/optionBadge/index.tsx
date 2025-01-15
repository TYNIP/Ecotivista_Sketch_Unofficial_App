import React, { useEffect, useState, useRef } from "react";
import ReportComponent from "@/components/articles/Reports";
import { usePathname } from "next/navigation";
import { useAuth } from "@/pages/api/context/AuthContext";

type EllipsisButtonProps = {
  article: () => void;
  setArticles: () => void;
};

const EllipsisButton: React.FC<EllipsisButtonProps> = ({ article, setArticles }) => {
    const pathname = usePathname();
      const { isAuthenticated, username } = useAuth();
      const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
      const [modalVisible, setModalVisible] = useState<boolean>(false);
      const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
      const [confirmationText, setConfirmationText] = useState<string>("");
      const dropdownRef = useRef<HTMLDivElement | null>(null);

      /* HANDLERS */
      const handleDropdownToggle = (articleId: string) => {
        if (dropdownVisible === articleId) {
          setDropdownVisible(null); 
          setArticleToDelete(null); 
        } else {
          setDropdownVisible(articleId); 
          setArticleToDelete(null);
        }
      };
      
      const handleSetArticleToDelete = (articleTitle: string) => {
        setArticleToDelete(articleToDelete === articleTitle ? null : articleTitle);
      };
      
    
      const handleDelete = async (articleId: string) => {
        if (confirmationText !== articleToDelete) {
          alert("Escriba exactamente el título del artículo en mayúsculas para confirmar la eliminación.");
          return;
        }
    
        try {
          const res = await fetch(`/api/articles/user/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleId: articleId }),
          });
    
          if (!res.ok) {
            throw new Error("No se pudo eliminar el artículo.");
          }
    
          setArticles((prev) => prev.filter((article) => article._id !== articleId));
          setDropdownVisible(null);
          setArticleToDelete(null);
          setConfirmationText("");
          alert("Artículo eliminado con éxito.");
        } catch (err) {
          console.error(err);
          alert("No se pudo eliminar el artículo. Por favor inténtalo de nuevo.");
        }
      };

  return (
    <>
        {isAuthenticated && (
                    <div className="dropdown-wrapper" ref={dropdownRef}>
                      <button
                        className="dropdown-toggle"
                        onClick={() => handleDropdownToggle(article._id)}
                      >
                          ...
                      </button>
        
                      {dropdownVisible === article._id && (
                        <div className="dropdown-menu">
                          {pathname.startsWith("/info") ? (
                            <>
                              <button onClick={() => handleSetArticleToDelete(article.title.toUpperCase())}>
                                  Borrar Articulo
                              </button>
        
                              {articleToDelete === article.title.toUpperCase() && (
                                <div className="confirmation-box">
                                  <p>
                                    Escriba el título en mayúsculas para confirmar la eliminación:
                                  </p>
                                  <input
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                  />
                                  <button
                                    onClick={() => handleDelete(article._id)}
                                  >
                                    Confirmar
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                            <button onClick={() => setModalVisible(true)}>
                              Reportar Articulo
                            </button>
        
                            </>
                          )}

                        </div>
                      )}
                    </div>
                  )}

                  {/* MODAL */}
                  {modalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button
                                className="close-modal"
                                onClick={() => setModalVisible(false)}
                                >
                                    × CERRAR
                                </button>
                            <ReportComponent article={article}/>
                        </div>
                    </div>
                )}

{/* STYLES */}
<style jsx>{`
        /* DROPDOWN */
        .dropdown-wrapper {
            position: relative;
            }

.dropdown-toggle {
  background-color: #25C660;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dropdown-toggle:hover {
  background-color: #1ea352;
}

.dropdown-menu {
  position: absolute;
  top: 45px; 
  right: 10px; 
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 20000;
  animation: dropdown-fade 0.2s ease-in-out;
}

.dropdown-menu button {
  background: none;
  border: none;
  width: 100%;
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-menu button:hover {
  background-color: #f9f9f9;
}

@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Adjust for better spacing and usability */
.confirmation-box {
  padding: 12px;
  border-top: 1px solid #eee;
  margin-top: 8px;
}

.confirmation-box input {
  width: calc(100% - 24px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px 0;
}

.confirmation-box button {
  background-color: #25C660;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


        /* MODAL */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50000 !important;
        }
        .modal-content {
          background: white;
          padding: 16px;
          border-radius: 10px;
          max-width: 500px;
          width: 100%;
          height: 90%;
          position: relative;
          overflow: scroll;
          z-index: 20000 !important;
        }
        .close-modal {
          position: fixed;
          text-align: left;
          margin: 0 0 5px 0;
          padding: 10px 20px 10px 10px;
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.3);
          border-radius: 10px;
          font-size: 2vh;
          cursor: pointer;
        }

        .close-modal:hover {
          background: rgba(0,0,0,0.1);
        }


        @media (max-width: 768px) {
          .articles-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .article-title {
            font-size: 1rem;
          }
          .article-content {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default EllipsisButton;
