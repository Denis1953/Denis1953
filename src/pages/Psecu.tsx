import React from 'react';
import Layout from '@/components/Layout';

const Psecu: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Sécurité, prévention']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{ minHeight: 'clamp(600px, 76.92vw, 1000px)', padding: 'clamp(20px, 6.15vw, 32px)' }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{ marginBottom: 'clamp(20px, 6.15vw, 32px)' }}>Sécurité, prévention</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              De gros moyens pour la sécurité, la tranquillité publique et la prévention de la délinquance.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 6.15vw, 32px)' }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Nos actions prioritaires</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Renforcement de la police municipale</li>
                  <li>• Installation de caméras de vidéosurveillance</li>
                  <li>• Amélioration de l'éclairage public</li>
                  <li>• Médiation et prévention de proximité</li>
                  <li>• Sécurisation des abords d'écoles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Psecu;