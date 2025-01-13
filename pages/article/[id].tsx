import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
const {PATHURL} = require('../api/config');
import styles from '../../styles/index.module.scss';

type ArticleContentItem = {
  type: "text" | "image" | "video" | "link" | "subtitle" | "spotify";
  content: string;
};

type Article = {
  title: string;
  description: string;
  author: string;
  username: string;
  createdAt: string;
  sections: ArticleContentItem[];
  imageUrl?: string;
};

interface ArticlePageProps {
  article: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  if(article.sections === undefined) {
    return <div style={{"background": "red", color: "white", "textAlign": "center", "borderRadius":"20px"}}>ARTICULO NO ENCONTRADO</div>
  }else{
  return (
    <>
      {/* SEO and Open Graph Metadata */}
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta name="author" content={article.username} />
        <meta name="keywords" content={`${article.title}, blog, articles`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.imageUrl || "/default-image.jpg"} />
        <meta property="og:type" content="article" />
        <meta property="og:published_time" content={article.createdAt} />
        <meta property="og:url" content={`${PATHURL}/article/${article.title}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.imageUrl || "/default-image.jpg"} />
        <link rel="canonical" href={`${PATHURL}/article/${article.title}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            author: { "@type": "Person", name: article.username },
            datePublished: article.createdAt,
            image: article.imageUrl,
            mainEntityOfPage: `${PATHURL}/article/${article.title}`,
          })}
        </script>
      </Head>

      <section className={styles.generalContainer}>
        <div className={styles.head}>
            <h1>{article.title}</h1>
            <p className="article-meta">
              Por <Link href={`/users/${article.username}`}><span className="article-author">{article.username}</span></Link> el{" "}
              <span className="article-date">{new Date(article.createdAt).toLocaleDateString()}</span>
            </p>
            <h3></h3>
              <p className={styles.description}>{article.description}</p>
            <h3></h3>
        </div>

        <article className={styles.mainContent}>


          {article.sections.map((item, index) => {
            if (item.type === "text") {
              return (
                <p key={index}>
                  {item.content}
                </p>
              );
            } else if (item.type === "image") {
              return (
                <div key={index} className={styles.imgContainer}>
                  <Image
                  key={index}
                  src={item.content}
                  width={100}
                  height={100}
                  alt={`Image ${index + 1}`}
                  className={styles.imgContent}
                />
                </div>
              );
            } else if (item.type === "link"){
              return (
                <div key={index} className={styles.buttons}>
                  <a key={index} href={`${item.content.url}`} className={styles.primaryButton} target="_blank">{item.content.text.toUpperCase()}</a>
                </div>
              )
            }
            else if (item.type === "subtitle") {
              return (
              <h3 key={index}>
                {item.content}
              </h3>
              );
            } else if (item.type === "spotify") {
              return (
                <iframe
                  src={`https://open.spotify.com/embed/${item.content}`}
                  allow="encrypted-media" 
                  key={index}
                  title="Spotify"
                  width="560"
                  height="460"
                  frameBorder="0"
                  allowFullScreen
                  className={styles.spotify}
                ></iframe>
              );
            }
            else if (item.type === "video") {
              return (
                <div key={index} className={styles.video}>
                  <iframe
                    src={`https://www.youtube.com/embed/${item.content.split("v=")[1]}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Video ${index + 1}`}
                  ></iframe>
                </div>
              );
            } 
            return null;
          })}

          <div className={styles.head}>
            <h3></h3>
            <p className="article-meta" style={{"marginBottom":"-70px"}}>
            El contenido de este artículo es responsabilidad exclusiva de su autor(a) y no refleja 
            necesariamente la postura y valores de Ecotivista. En Ecotivista promovemos la libertad 
            de expresión y la diversidad de perspectivas. Cada usuario es libre de compartir sus 
            puntos de vista de manera individual.
            </p>
          </div>
        </article>
      </section>
      <style jsx>{`
        .article-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .article-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        .article-meta {
          font-size: 0.9rem;
          color: #666;
          margin: 10px 0;
        }
        .article-content {
          margin-top: 20px;
        }
        .article-text {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .article-image {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          margin-bottom: 16px;
          border-radius: 8px;
        }
        .article-video {
          margin-bottom: 16px;
        }
        iframe {
          width: 100%;
          height: 315px;
        }
      `}</style>
    </>
  )};
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    console.log("qwsde")
    const host = context.req.headers.host; 
    const protocol = context.req.headers["x-forwarded-proto"] || "http"; 
    const baseUrl = `${protocol}://${host}`;

    console.log("ahhhhhhhh", `${baseUrl}/api/articles/search?id=${id}`);
    const res = await fetch(`${baseUrl}/api/articles/search?id=${id}`);
    const article = await res.json();
    console.log(article);

    if (!article) {
      return { notFound: true };
    }

    return {
      props: {
        article,
      },
    };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
};


export default ArticlePage;
