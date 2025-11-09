import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
const Bilan_2: React.FC = () => {
  const [imageLoading, setImageLoading] = useState(true);
  return <Layout breadcrumbItems={['Accueil', 'Bilan 2020-2026', 'Services publics']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <div className="prose max-w-none">
            <div className="relative">
              {imageLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />}
              <img width={210} height={297} src="/lovable-uploads/Bilan_p5.jpg" alt="Renforcé nos services publics au quotidien" className={`w-full h-auto block rounded-lg shadow-sm transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setImageLoading(false)} onError={() => setImageLoading(false)} />
            </div>
            
            <div className="flex justify-end mt-4">
              <a href="/bilan_3-4" className="text-primary hover:underline font-medium">Bilan suivant...</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Bilan_2;