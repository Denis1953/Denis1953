import React from 'react';
import Layout from '@/components/Layout';

const Psport: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Notre Programme', 'Vie associative et sport']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
          minHeight: 'clamp(600px, 76.92vw, 1000px)',
          padding: 'clamp(20px, 6.15vw, 32px)'
        }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Vie associative et sport</h1>
          <div className="prose max-w-none">
            <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Pour l'épanouissement par le sport et le vivre ensemble.</p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 6.15vw, 32px)'
            }}>
              <div>
                <h2 className="responsive-text-2xl font-semibold text-primary" style={{
                  marginBottom: 'clamp(12px, 3.08vw, 16px)'
                }}>Développement sportif et associatif</h2>
                <ul className="space-y-2 ml-6">
                  <li>• Soutien aux associations locales</li>
                  <li>• Amélioration des équipements sportifs</li>
                  <li>• Promotion du sport pour tous</li>
                  <li>• Animation et événements sportifs</li>
                  <li>• Espaces de convivialité</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Psport;