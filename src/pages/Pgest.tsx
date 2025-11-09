import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSpinner from '@/components/LoadingSpinner';
const Pgest: React.FC = () => {
  const [imageLoading, setImageLoading] = useState(true);
  return <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Gestion communale']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
          marginBottom: 'clamp(20px, 6.15vw, 32px)'
        }}>Notre programme en gestion communale</h1>
          <div className="prose max-w-none">
            <div className="w-full relative aspect-[4/3]">
              {imageLoading && <div className="absolute inset-0 flex items-center justify-center z-10">
                  <LoadingSpinner size="md" />
                </div>}
              
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Pgest;