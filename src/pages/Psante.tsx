import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';

const Psante: React.FC = () => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Layout breadcrumbItems={['Accueil','Notre Programme','Santé']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{ padding: 'clamp(20px, 6.15vw, 32px)' }}>
          <div className="prose max-w-none">
            <div className="w-full relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <LoadingSpinner size="md" />
                </div>
              )}
              <img 
                src="/lovable-uploads/page_04.jpg" 
                alt="Santé - Programme électoral" 
                className={`w-full h-auto object-contain rounded-lg shadow-sm ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>
            
            <div className="w-full relative" style={{ marginTop: '15px' }}>
              <img 
                src="/lovable-uploads/page_05.jpg" 
                alt="Santé - Programme détaillé" 
                className="w-full h-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Psante;
