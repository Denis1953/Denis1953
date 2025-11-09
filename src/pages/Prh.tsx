import React from 'react';
import Layout from '@/components/Layout';

const Prh: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Ressources humaines']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{ minHeight: 'clamp(600px, 76.92vw, 1000px)', padding: 'clamp(20px, 6.15vw, 32px)' }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{ marginBottom: 'clamp(20px, 6.15vw, 32px)' }}>Ressources humaines</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              Une gestion des ressources humaines communales saine et transparente pour la qualité du service public.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 6.15vw, 32px)' }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Nos priorités</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Valorisation du personnel communal</li>
                  <li>• Formation continue des agents</li>
                  <li>• Amélioration des conditions de travail</li>
                  <li>• Recrutement transparent et équitable</li>
                  <li>• Développement de la polyvalence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Prh;