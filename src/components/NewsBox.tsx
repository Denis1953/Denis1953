import React from "react";
import { useNavigate } from "react-router-dom";

export interface NewsBoxData {
  id: string;
  image?: string;
  label: string;
  labelColor: string;
  title: string;
  description: string;
  link?: string;
}

interface NewsBoxProps {
  news: NewsBoxData;
  variant?: "desktop" | "mobile";
}

export const NewsBox: React.FC<NewsBoxProps> = ({ news, variant = "desktop" }) => {
  const navigate = useNavigate();
  const isMobile = variant === "mobile";
  const widthClass = isMobile ? "w-full max-w-[300px]" : "w-[190px]";
  const heightClass = isMobile ? "h-[316px]" : "h-[200px]";
  const imageHeightClass = isMobile ? "h-[158px]" : "h-[100px]";

  const handleClick = () => {
    if (news.link) {
      navigate(news.link);
    }
  };

  return (
    <div 
      className={`${widthClass} ${heightClass} border border-black rounded mx-auto relative overflow-hidden ${news.link ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={handleClick}
    >
      {/* Top part with background image */}
      <div
        className={`w-full ${imageHeightClass} bg-cover bg-center relative`}
        style={{
          backgroundImage: news.image ? `url('${news.image}')` : undefined,
          backgroundColor: news.image ? undefined : "#d1d5db",
        }}
      >
        {/* Label */}
        <div className={`absolute bottom-0 left-0 ${news.labelColor} text-white text-xs font-bold px-2 py-1 h-[30px] flex items-center rounded-r`}>
          {news.label}
        </div>
      </div>
      {/* Bottom part with white background */}
      <div className={`w-full ${imageHeightClass} bg-white p-3 flex flex-col`}>
        <h4 className="text-black text-xs font-bold mb-2 leading-tight">
          {news.title}
        </h4>
        <p className="text-black text-xs leading-tight">
          {news.description}
        </p>
      </div>
    </div>
  );
};
