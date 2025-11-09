import React from 'react';
import Layout from '@/components/Layout';

const Pcom: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Commerce, attractivité']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
          minHeight: 'clamp(600px, 76.92vw, 1000px)',
          padding: 'clamp(20px, 6.15vw, 32px)'
        }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Commerce, attractivité</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Une ville plus belle et agréable à vivre.</p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 6.15vw, 32px)'
            }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                  marginBottom: 'clamp(12px, 3.08vw, 16px)'
                }}>Dynamisation commerciale et attractivité</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Soutien aux commerces locaux</li>
                  <li>• Animation du centre-ville</li>
                  <li>• Amélioration de l'attractivité</li>
                  <li>• Développement économique local</li>
                  <li>• Valorisation du patrimoine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pcom;