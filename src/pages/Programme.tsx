import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
const Programme: React.FC = () => {
  useEffect(() => {
    // SEO basics
    document.title = 'Programme - Éducation, jeunesse | Fontaine 2026';
    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    ensureMeta('description', "Programme: Éducation, jeunesse et petite enfance - nos propositions 2026-2032 pour Fontaine.");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/programme`);
  }, []);

  // Ordre strict demandé + images fournies (gauche→droite, haut→bas)
  const items = [{
    image: '/lovable-uploads/stethoscope.jpg',
    title: 'Santé',
    text: 'Favoriser l’implantation de professionnels de santé pour rendre la santé accessible au plus grand nombre.​',
    badge: 'Priorité'
  }, {
    image: '/lovable-uploads/3afd4453-062f-4f63-a064-c61412c44364.png',
    title: 'Qualité environnementale',
    text: 'Améliorer la qualité de vie de nos habitants en créant une ville attractive, moderne et écologique.​',
    badge: 'Priorité'
  }, {
    image: '/lovable-uploads/a5887d86-f4f8-4c9b-bf06-5da0668b313f.png',
    title: 'Sécurité',
    text: 'Renforcer les contrôles et les sanctions contre la grande délinquance et les incivilités du quotidien​.​',
    badge: 'Priorité'
  }, {
    image: '/lovable-uploads/8e13040c-5e7a-4a00-8e27-85e2a010dd17.png',
    title: 'Education',
    text: 'Favoriser le développement de nos jeunes et leur donner un cadre dans leur épanouissement​.​',
    badge: 'Priorité'
  }, {
    image: '/lovable-uploads/Mairie_600x600.jpeg',
    title: 'Gestion communale (financière et RH)',
    text: "Continuer d'investir en maintenant une bonne santé financière.",
    badge: 'Priorité'
  }, {
    image: '/lovable-uploads/0fb4d691-8678-4573-a099-47fd167340df.png',
    title: 'Aménagement urbain et attractivité commerciale',
    text: 'Moderniser et embellir la commune en améliorant la qualité de vie.'
  }, {
    image: '/lovable-uploads/3715a4b0-1ede-41c0-9a2f-e0298e7fd6d6.png',
    title: 'Culture, animation',
    text: "Rendre la culture accessible au plus grand nombre et diversifier l'offre."
  }, {
    image: '/lovable-uploads/6209010f-8e87-4f35-a4b0-00aa735a3538.png',
    title: 'Sport et vie associative',
    text: 'Developper le sport pour tous et accompagner le développement de la vie associative​​.'
  }, {
    image: '/lovable-uploads/bab39dc0-e6f3-4e06-b349-e2d07b08525f.png',
    title: 'Social et solidarités',
    text: 'Accompagner les plus fragiles et aider dans les démarches administratives​.'
  }, {
    image: '/lovable-uploads/Balayeuse.jpg',
    title: 'Entretien courant, travaux et modernisation des équipements',
    text: 'Améliorer la propreté et la qualité de nos rues et bâtiments publics​.​'
  }];
  return <Layout breadcrumbItems={['Accueil', 'Programme']} showHeader={true}>
      {/* Titre + intro */}
      <div className="campaign-container">
        <div className="bg-white rounded-lg shadow-sm" style={{
        padding: 'clamp(20px, 6.15vw, 32px)'
      }}>
          <section aria-label="Introduction du programme" className="w-full">
            <h1 className="responsive-text-3xl font-bold text-primary" style={{
            marginBottom: 'clamp(20px, 6.15vw, 32px)'
          }}>Notre programme</h1>
            <div className="prose max-w-none">
              <p className="responsive-text-lg" style={{
              marginBottom: 'clamp(16px, 4.62vw, 24px)'
            }}>Découvrez le détail de nos propositions pour Fontaine 2026-2032 en cliquant sur les images.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Bloc centré */}
      <section aria-label="Grille de 10 blocs thématiques" className="w-full">
        <div className="ten-hover-blocks">
          <style>{`
            .ten-hover-blocks { margin: 40px auto; padding: 0 16px; }
            /* Par défaut: 2/3/4/5 colonnes selon largeur */
            .ten-hover-blocks .container { display: grid; grid-template-columns: repeat(2, 230px); grid-auto-rows: 230px; gap: 30px; justify-content: center; }
            @media (min-width: 800px) { .ten-hover-blocks .container { grid-template-columns: repeat(3, 230px); } }
            @media (min-width: 1030px) { .ten-hover-blocks .container { grid-template-columns: repeat(4, 230px); } }
            @media (min-width: 1270px) { .ten-hover-blocks .container { grid-template-columns: repeat(5, 230px); } }

            /* Smartphone portrait: 1 colonne */
            @media (max-width: 480px) and (orientation: portrait) {
              .ten-hover-blocks .container { grid-template-columns: repeat(1, 230px); }
              /* Désactiver l'effet ombre + agrandissement sur smartphone portrait */
              .ten-hover-blocks .card { transform: none !important; box-shadow: none !important; }
            }

            .ten-hover-blocks .card { width: 230px; height: 230px; position: relative; overflow: hidden; border-radius: 0 0 25px 0; cursor: pointer; text-decoration: none; transition: transform .25s ease, box-shadow .25s ease; will-change: transform; box-shadow: none; }
            .ten-hover-blocks .card:hover, .ten-hover-blocks .card:focus-visible { transform: scale(1.02); box-shadow: 2px 2px 10px 0px hsl(0 0% 61%); }

            .ten-hover-blocks .bg { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity .5s ease, transform .5s ease; opacity: 1; transform: scale(1); border-radius: inherit; }
            .ten-hover-blocks .card:hover .bg, .ten-hover-blocks .card:focus-visible .bg { opacity: 0; transform: scale(0.85); }
            /* Design system tokens */
            .ten-hover-blocks .overlay { position: absolute; inset: 0; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); display: flex; align-items: center; justify-content: center; text-align: center; padding: 16px; opacity: 0; transition: opacity .5s ease; border-radius: inherit; }
            .ten-hover-blocks .card:hover .overlay, .ten-hover-blocks .card:focus-visible .overlay { opacity: 1; }
            .ten-hover-blocks .overlay-text { line-height: 1.25; white-space: normal; word-break: normal; overflow-wrap: break-word; }
            .ten-hover-blocks .overlay-text strong { display: inline-block; margin-bottom: 8px; font-weight: 700; }
            .ten-hover-blocks .card:focus-visible { outline: 3px solid hsl(var(--foreground)); outline-offset: 2px; }

            .ten-hover-blocks .corner-badge { position: absolute; top: 0; right: 0; width: 142px; height: 25px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; background: rgba(220, 20, 60, 0.85); pointer-events: none; z-index: 2; border-bottom-left-radius: 6px; }
          `}</style>

          <div className="container">
            {items.map((it, idx) => <a key={`item-${idx}`} href={idx === 0 ? "/psante" : idx === 4 ? "/pgest" : "#"} className="card" role="link" aria-label={`${it.title} – ${it.text}`}>
                {it.badge && <span className="corner-badge">{it.badge}</span>}
                <div className="bg" style={{
              backgroundImage: it.image ? `url(${it.image})` : 'none'
            }} />
                <div className="overlay">
                  <div className="overlay-text">
                    <strong>{it.title}</strong><br />
                    <span>{it.text}</span>
                  </div>
                </div>
              </a>)}
          </div>
        </div>
      </section>
    </Layout>;
};
export default Programme;