import React from 'react';
import Layout from '@/components/Layout';

const Peduc: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Éducation, jeunesse, petite enfance']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
          minHeight: 'clamp(600px, 76.92vw, 1000px)',
          padding: 'clamp(20px, 6.15vw, 32px)'
        }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Éducation, jeunesse, petite enfance</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Des moyens pour la jeunesse fontainoise.</p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 6.15vw, 32px)'
            }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                  marginBottom: 'clamp(12px, 3.08vw, 16px)'
                }}>Nos priorités pour l'éducation et la jeunesse</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Amélioration des infrastructures scolaires</li>
                  <li>• Renforcement des activités périscolaires</li>
                  <li>• Soutien aux structures petite enfance</li>
                  <li>• Développement des espaces jeunes</li>
                  <li>• Formation et accompagnement éducatif</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Peduc;