import React from "react";
interface InfoFlashProps {
  variant?: "desktop" | "mobile";
}
export const InfoFlash: React.FC<InfoFlashProps> = ({
  variant = "desktop"
}) => {
  const isMobile = variant === "mobile";
  const heightClass = isMobile ? "h-[280px]" : "h-[320px]";
  const widthClass = isMobile ? "w-full" : "w-full max-w-[250px] sm:w-[250px]";
  const titleSize = isMobile ? "text-lg" : "text-xl";
  const textSize = isMobile ? "text-lg" : "text-base";
  return <div className={`${widthClass} ${heightClass} bg-white rounded-lg shadow-sm border border-separator ${isMobile ? "" : "mx-auto sm:mx-0"} p-0 flex flex-col`}>
      {/* Titre */}
      <div className={`${isMobile ? "min-h-[64px]" : "min-h-[56px]"} py-2 flex items-center border-b border-gray-400 overflow-x-hidden overflow-y-visible bg-black`}>
        <div className="animate-scroll-horizontal whitespace-nowrap flex h-full items-center leading-[60px]">
          <div className="flex">
            {[...Array(8)].map((_, i) => <h4 key={i} className={`${titleSize} font-bold text-yellow-400 mr-6 font-delayed tracking-wider`}>PROCHAINES REUNIONS PUBLIQUES</h4>)}
          </div>
          <div className="flex" aria-hidden="true">
            {[...Array(8)].map((_, i) => <h4 key={`duplicate-${i}`} className={`${titleSize} font-bold text-yellow-400 mr-6 font-delayed tracking-wider`}>PROCHAINES REUNIONS PUBLIQUES</h4>)}
          </div>
        </div>
      </div>
      {/* Annonce */}
      <div className={`flex-1 flex items-center justify-center ${isMobile ? "" : "bg-[#db1313]"}`} style={{
      backgroundColor: "hsl(32, 85%, 95%)",
      borderRadius: isMobile ? "0 0 10px 10px" : undefined
    }}>
        <div className="text-center px-3">
          <div className={`leading-tight ${textSize}`}>
            <p className="font-bold" style={{
            color: "#db1313"
          }}>Réunion publique</p>
            <p className="font-normal text-black">Mardi 24 février | 18h | Salle Tavel</p>
            <br />
            <p className="font-bold" style={{
            color: "#db1313"
          }}>Réunion publique</p>
            <p className="font-normal text-black">Vendredi 6 mars | 18h | Salle Emile Bert</p>
            <br />
            <p className="font-bold" style={{
            color: "#db1313"
          }}>Meeting de fin de campagne</p>
            <p className="font-normal text-black">Jeudi 12 mars | 18h | Salle Edmond Vigne</p>
          </div>
        </div>
      </div>
    </div>;
};