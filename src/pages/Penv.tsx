import React from 'react';
import Layout from '@/components/Layout';
const Penv: React.FC = () => {
  return <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Environnement']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        minHeight: 'clamp(600px, 76.92vw, 1000px)',
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
          marginBottom: 'clamp(20px, 6.15vw, 32px)'
        }}>Environnement</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
            marginBottom: 'clamp(16px, 4.62vw, 24px)'
          }}>Nos projets pour l'environnement, l'arborisation et la végétalisation.</p>
            
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(20px, 6.15vw, 32px)'
          }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                marginBottom: 'clamp(12px, 3.08vw, 16px)'
              }}>Nos priorités environnementales</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Développement des espaces verts</li>
                  <li>• Plantation d'arbres et végétalisation</li>
                  <li>• Protection de la biodiversité locale</li>
                  <li>• Gestion durable des ressources</li>
                  <li>• Sensibilisation environnementale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Penv;