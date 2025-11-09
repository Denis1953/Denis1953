import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
const Equipe: React.FC = () => {
  const [imageLoading, setImageLoading] = useState(true);
  return <Layout breadcrumbItems={['Accueil', "Nos soutiens"]} showHeader={true}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <div className="w-full relative">
            {imageLoading && <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner size="md" />
              </div>}
            <img src="/lovable-uploads/page3_extrait_1600px.jpg" alt="Nos soutiens - Ensemble pour Fontaine" className={`w-full h-auto object-contain rounded-lg shadow-sm ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
            <div className="text-right mt-4">
              <p className="italic font-semibold text-xl text-[#ff7c1f] px-[30px]">et bien d'autres...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Equipe;