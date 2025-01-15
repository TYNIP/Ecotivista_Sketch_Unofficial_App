import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Loader } from "../../components/loader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/pages/api/context/AuthContext";
import ReportComponent from "@/components/articles/Reports";

function userSettings(path) {
  path = path.split("/");
  if (path[1] === "info");
}

type Article = {
  _id: string;
  title: string;
  content: string;
  username: string;
  imageUrl?: string;
};

interface UserArticlesProps {
  id?: string;
  numberOfArticles?: number;
}

const UserArticles: React.FC<UserArticlesProps> = ({ id, numberOfArticles }) => {
  const pathname = usePathname();
  const { isAuthenticated, username } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [confirmationText, setConfirmationText] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Se requiere Id");
      return;
    }

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `/api/articles/user?id=${id}${numberOfArticles ? `&limit=${numberOfArticles}` : ""}`;
        console.log(`Fetching: ${url}`);
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch articles.");
        }

        const data: Article[] = await res.json();
        console.log(data);
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id, numberOfArticles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      alert("Escriba el título del artículo en mayúsculas para confirmar la eliminación.");
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

  if (loading)
    return (
      <div style={{ height: "6vh", paddingTop: "3vh" }}>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          height: "6vh",
          paddingTop: "3vh",
          width: "100%",
          textAlign: "center",
        }}
      >
        Error: {error}
      </div>
    );
  if (articles.length === 0)
    return (
      <div style={{ height: "6vh", paddingTop: "3vh" }}>
        No Hay Articulos Disponibles
      </div>
    );

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <div key={article._id} className={`article-card ${article.imageUrl ? "" : "no-image"}`}>
          <Link href={`/article/${article._id}`}>
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={300}
                height={200}
                className="article-image"
              />
            ) : (
              <div className="article-no-image-content">
                <h2 className="article-title">{article.title}</h2>
                <span>Por {article.username}</span>
                <p className="article-content">{article.description}</p>
              </div>
            )}
            {article.imageUrl && (
              <>
                <h2 className="article-title">{article.title}</h2>
                <p className="article-content">{article.content}</p>
              </>
            )}
          </Link>
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
                          Delete Article
                      </button>

                      {articleToDelete === article.title.toUpperCase() && (
                        <div className="confirmation-box">
                          <p>
                            Type the title in uppercase to confirm deletion:
                          </p>
                          <input
                            type="text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                          />
                          <button
                            onClick={() => handleDelete(article._id)}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                    <button onClick={() => setModalVisible(true)}>
                      Report Article
                    </button>

                    {modalVisible && (
                        <div className="modal">
                          <div className="modal-content">
                            <button
                              className="close-button"
                              onClick={() => setModalVisible(false)}
                              >
                                    ×
                              </button>
                            <ReportComponent article={articles}/>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      ))}

      <style jsx>{`
        .articles-container {
          width: 100% !important;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          padding: 16px;
          margin-top: 1%;
        }
        .article-card {
          border: 3px solid #25C660;
          border-radius: 8px;
          padding: 16px;
          background-color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .article-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .article-no-image-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .article-title {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 12px 0;
          color: #333;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-content {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .no-image .article-title {
          font-size: 1.5rem;
          color: #222;
        }
        .no-image .article-content {
          margin-top: 8px;
          font-size: 1rem;
          color: #444;
        }

        /* DROPDOWN */

        /* DROPDOWN */

.dropdown-wrapper {
  position: relative;
}

.dropdown-toggle {
  background-color: #25C660;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 40px;
  height: 40px;
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
  top: 45px; /* Ensure it appears just below the button */
  right: 10px; /* Align to the right edge of the button */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 1000;
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
          z-index: 2000;
        }
        .modal-content {
          background: white;
          padding: 16px;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          position: relative;
        }
        .close-modal {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
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
    </div>
  );
};

export default UserArticles;
