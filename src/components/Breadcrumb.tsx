import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: string[];
  makeLastItemActive?: boolean;
  onBreadcrumbClick?: (item: string, index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, makeLastItemActive = false, onBreadcrumbClick }) => {
  const getPathFromBreadcrumb = (item: string, index: number) => {
    if (index === 0 || item === 'ACCUEIL') return '/';
    if (item === "NOS SOUTIENS") return '/equipe';
    if (item === 'BILAN' || item === 'Bilan 2020-2026') return '/bilan';
    if (item === 'PROGRAMME' || item === 'Notre Programme') return '/programme';
    if (item === 'PROCURATIONS') return '/procurations';
    if (item === 'DIVERS') return '/divers';
    if (item === 'Connexion') return '/login';
    return '/';
  };

  return (
    <div className="bg-white w-full border-b-2 border-border" style={{ minHeight: 'clamp(32px, 2.77vw, 36px)' }}>
      <div className="campaign-container flex items-center" style={{ paddingTop: 'clamp(8px, 0.69vw, 9px)', paddingBottom: 'clamp(8px, 0.69vw, 9px)' }}>
        <nav style={{ paddingLeft: 'clamp(15px, 6.92vw, 36px)' }}>
          <span className="breadcrumb-text">
            {items.map((item, index) => (
              <span key={index}>
                {index < items.length - 1 || (makeLastItemActive && index === items.length - 1) ? (
                  <Link 
                    to={getPathFromBreadcrumb(item, index)} 
                    className="hover:underline cursor-pointer"
                    onClick={() => onBreadcrumbClick?.(item, index)}
                  >
                    {item}
                  </Link>
                ) : (
                  <span>{item}</span>
                )}
                {index < items.length - 1 && ' > '}
              </span>
            ))}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;