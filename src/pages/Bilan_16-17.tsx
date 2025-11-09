import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';
const Bilan_16_17: React.FC = () => {
  const [imagesLoading, setImagesLoading] = useState(true);
  return <Layout breadcrumbItems={['Accueil', 'Bilan 2020-2026', 'Vie associative et sportive']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <div className="prose max-w-none">
            <div className="space-y-4">
              <div className="relative">
                {imagesLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />}
                <img width={210} height={297} src="/lovable-uploads/Bilan_p17.jpg" alt="Favoriser la vie associative et sportive - page 1" className={`w-full h-auto block rounded-lg shadow-sm transition-opacity duration-300 ${imagesLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setImagesLoading(false)} onError={() => setImagesLoading(false)} />
              </div>
              <div className="relative flex justify-center">
                {imagesLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />}
                <img src="/lovable-uploads/Bilan_p18.jpg" alt="Favoriser la vie associative et sportive - page 2" className={`h-auto block rounded-lg shadow-sm transition-opacity duration-300 ${imagesLoading ? 'opacity-0' : 'opacity-100'}`} />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <a href="/bilan" className="text-primary hover:underline font-medium">Retour liste...</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Bilan_16_17;