import React from 'react';
import Layout from '@/components/Layout';

const Purba: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Urbanisme, aménagement, mobilité']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
          minHeight: 'clamp(600px, 76.92vw, 1000px)',
          padding: 'clamp(20px, 6.15vw, 32px)'
        }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Urbanisme, aménagement, mobilité</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Une ville attractive où il fait bon vivre et circuler.</p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 6.15vw, 32px)'
            }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                  marginBottom: 'clamp(12px, 3.08vw, 16px)'
                }}>Nos projets d'aménagement urbain</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Amélioration des espaces publics</li>
                  <li>• Développement des mobilités douces</li>
                  <li>• Rénovation urbaine et habitat</li>
                  <li>• Accessibilité et circulation</li>
                  <li>• Planification urbaine durable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Purba;