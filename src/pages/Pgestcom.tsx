import React from 'react';
import Layout from '@/components/Layout';
const Pgestcom: React.FC = () => {
  return <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Gestion communale']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        minHeight: 'clamp(600px, 76.92vw, 1000px)',
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
          marginBottom: 'clamp(20px, 6.15vw, 32px)'
        }}>Gestion communale</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
            marginBottom: 'clamp(16px, 4.62vw, 24px)'
          }}>
              Une bonne gestion communale et la participation des habitants sur les projets structurants.
            </p>
            
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 6.15vw, 32px)'
          }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                marginBottom: 'clamp(12px, 3.08vw, 16px)'
              }}>
              </h2>
                <ul className="space-y-2 ml-6">
                  <li>• Transparence dans la gestion des finances publiques</li>
                  <li>• Concertation citoyenne sur les grands projets</li>
                  <li>• Modernisation des services municipaux</li>
                  <li>• Simplification des démarches administratives</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Pgestcom;