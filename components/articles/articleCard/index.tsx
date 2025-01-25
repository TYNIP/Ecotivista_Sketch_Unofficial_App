import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import EllipsisButton from "../optionBadge";

export default function ArticleCard({article, setArticles}:any) {
  const [coverPage, setCoverPage] = useState();

  useEffect(() => {
    let img = article.sections.filter((section:any)=>section.type === "image");
    if(img.length > 0) {
      setCoverPage(img[0].content);
    };
  },[article]);

  
  return (
    <div key={article._id} className={`article-card ${coverPage ? "" : "no-image"}`}>
    <Link href={`/article/${article._id}`}>
      {coverPage ? (
        <div className="article-image">
          <Image
          src={coverPage}
          alt={article.title}
          width={"1000"}
          height={"1000"}
          style={{objectFit: "cover", marginTop:"-25%"}}
        />
        </div>
      ) : (
        <div className="article-no-image-content">
          <h2 className="article-title">{article.title}</h2>
          <span>Por {article.username}</span>
          <p className="article-content">{article.description}</p>
        </div>
      )}
      {coverPage && (
        <>
          <h2 className="article-title">{article.title}</h2>
          <span>Por {article.username}</span>
          <p className="article-content">{article.description}</p>
        </>
      )}
    </Link>

    {/* Option Badge */}
    {/* @ts-ignore */}
    <EllipsisButton article={article} setArticles={setArticles}/> 

    {/* STYLES */}
    <style jsx>{`
        .article-card {
          border: 3px solid #25C660;
          border-radius: 8px;
          padding: 16px;
          background-color: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          min-width: 300px;
        }

        .article-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
        .article-image {
          width: 100%;
          height: 150px;
          overflow: hidden;
          object-fit: cover;
          border-radius: 10px;
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
          line-height: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article-content {
          font-size: 0.9rem;
          color: #666;
          line-height: 1;
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

        @media only screen and (max-width: 400px) {
        .article-card {
        min-width: 200px;
      }
    }

      `}</style>

  </div>
  );
}
