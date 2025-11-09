import React from 'react';
import Layout from '@/components/Layout';

const Plegal: React.FC = () => {
  return (
    <Layout breadcrumbItems={['Accueil', 'Mentions légales']} showHeader={false}>
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{ minHeight: 'clamp(600px, 76.92vw, 1000px)', padding: 'clamp(20px, 6.15vw, 32px)' }}>
          <h1 className="responsive-text-3xl font-bold text-primary" style={{ marginBottom: 'clamp(20px, 6.15vw, 32px)' }}>Mentions légales</h1>
          
          <div className="prose max-w-none">
            <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Directeur de la publication</h2>
            <p style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              <strong>Franck LONGO</strong><br />
              1, rue de la Paix<br />
              38600 Fontaine
            </p>

            <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Développement et hébergement</h2>
            <p style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              <strong>Développeur :</strong> MinDev38<br />
 
            </p>

            <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Propriété intellectuelle</h2>
            <p style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>

            <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Données personnelles</h2>
            <p style={{ marginBottom: 'clamp(16px, 4.62vw, 24px)' }}>
              Aucune information personnelle n'est collectée à votre insu ni cédée à des tiers et aucun cookie ou fichier équivalent n'est utilisé par ce site.
            </p>

            <h2 className="responsive-text-2xl font-semibold text-primary" style={{ marginBottom: 'clamp(12px, 3.08vw, 16px)' }}>Responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
              mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
              merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plegal;