import React from 'react';
import Layout from '@/components/Layout';

const Pcult: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Culture, animation']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
          minHeight: 'clamp(600px, 76.92vw, 1000px)',
          padding: 'clamp(20px, 6.15vw, 32px)'
        }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Culture, animation</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Épanouissement par la culture et les animations au service des habitants.</p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 6.15vw, 32px)'
            }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                  marginBottom: 'clamp(12px, 3.08vw, 16px)'
                }}>Projets culturels et animations</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Développement de l'offre culturelle</li>
                  <li>• Organisation d'événements</li>
                  <li>• Soutien aux artistes locaux</li>
                  <li>• Espaces culturels et créatifs</li>
                  <li>• Animation territoriale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pcult;