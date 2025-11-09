import React from "react";
import Layout from "@/components/Layout";
const Bilan: React.FC = () => {
  return <Layout breadcrumbItems={["Accueil", "Bilan 2020-2026"]} showHeader={true}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        minHeight: "clamp(600px, 76.92vw, 1000px)",
        padding: "clamp(20px, 6.15vw, 32px)"
      }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
          marginBottom: "clamp(16px, 3.85vw, 24px)"
        }}>
            Notre bilan 2020-2026
          </h1>

          <p className="responsive-text-xl font-semibold text-primary" style={{
          marginBottom: "clamp(24px, 5.77vw, 32px)"
        }}>Durant ce mandat nous avons su :</p>

          <div className="space-y-4">
            <a href="/bilan_1" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#1081CC] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#1081CC] hover:scale-105 transition-transform duration-200 origin-left font-medium">Gérer la ville de façon exemplaire et transparente</h2>
            </a>

            <a href="/bilan_2" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#721271] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#721271] hover:scale-105 transition-transform duration-200 origin-left font-medium">Renforcer nos services publics au quotidien</h2>
            </a>

            <a href="/bilan_3-4" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#187923] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#187923] hover:scale-105 transition-transform duration-200 origin-left font-medium">Préserver notre environnement</h2>
            </a>

            <a href="/bilan_5-6" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#1E246F] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#1E246F] hover:scale-105 transition-transform duration-200 origin-left font-medium">Agir pour votre sécurité</h2>
            </a>

            <a href="/bilan_7-8" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#1EA392] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#1EA392] hover:scale-105 transition-transform duration-200 origin-left font-medium">Accompagner nos enfants</h2>
            </a>

            <a href="/bilan_9-10" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#C3005E] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#C3005E] hover:scale-105 transition-transform duration-200 origin-left font-medium">Agir pour la santé et la solidarité</h2>
            </a>

            <a href="/bilan_10-11" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#117374] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#117374] hover:scale-105 transition-transform duration-200 origin-left font-medium">Embellir la ville</h2>
            </a>

            <a href="/bilan_12-13" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#9C0317] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#9C0317] hover:scale-105 transition-transform duration-200 origin-left font-medium">Rendre Fontaine plus attrative</h2>
            </a>

            <a href="/bilan_14-15" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#E45A71] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#E45A71] hover:scale-105 transition-transform duration-200 origin-left font-medium">Agir pour un accès à la culture pour tous</h2>
            </a>

            <a href="/bilan_16-17" className="flex items-center gap-3 p-4">
              <span className="w-2 h-2 rounded-full bg-[#75B21D] flex-shrink-0"></span>
              <h2 className="responsive-text-xl text-[#75B21D] hover:scale-105 transition-transform duration-200 origin-left font-medium">Favoriser la vie associative et sportive</h2>
            </a>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Bilan;