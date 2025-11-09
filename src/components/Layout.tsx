import React from 'react';
import Breadcrumb from './Breadcrumb';
import Header from './Header';
import Footer from './Footer';
import fondGris from '@/assets/fond_gris_scaled.png';

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: string[];
  showHeader?: boolean;
  onShowNews?: () => void;
  makeLastBreadcrumbActive?: boolean;
  onBreadcrumbClick?: (item: string, index: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  breadcrumbItems = ['Accueil'], 
  showHeader = true,
  onShowNews,
  makeLastBreadcrumbActive = false,
  onBreadcrumbClick
}) => {
  return (
    <div 
      className="min-h-screen bg-background"
      style={{
        backgroundImage: `url(${fondGris})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-background min-h-screen">
        <Breadcrumb items={breadcrumbItems} makeLastItemActive={makeLastBreadcrumbActive} onBreadcrumbClick={onBreadcrumbClick} />
        
        <div style={{ paddingTop: 'clamp(32px, 3.23vw, 42px)' }}>
          {showHeader && <Header onShowNews={onShowNews} />}
          
          <main className={showHeader ? '' : 'pt-0'} style={{ paddingTop: showHeader ? 'clamp(40px, 3.84vw, 50px)' : '0' }}>
            {children}
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;