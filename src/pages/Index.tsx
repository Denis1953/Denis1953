import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { InfoFlash } from "@/components/InfoFlash";
import { NewsBox } from "@/components/NewsBox";
import { newsData } from "@/data/newsData";
import candidatePhoto from "@/assets/candidate-photo.jpg";
const Index = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showNewsOnly, setShowNewsOnly] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect orientation change and close news view when switching to landscape
  useEffect(() => {
    const handleOrientationChange = () => {
      // Check if we're in landscape mode and news is currently showing
      if (window.innerHeight < window.innerWidth && showNewsOnly) {
        setShowNewsOnly(false);
      }
    };

    // Listen for resize events (which include orientation changes)
    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [showNewsOnly]);
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = container;
      setShowScrollUp(scrollTop > 0);
      setShowScrollDown(scrollTop < scrollHeight - clientHeight);
    }
  };
  useEffect(() => {
    checkScrollButtons();
  }, []);
  const scrollUp = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        top: -200,
        behavior: "smooth"
      });
    }
  };
  const scrollDown = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        top: 200,
        behavior: "smooth"
      });
    }
  };

  // News only view for mobile
  if (showNewsOnly) {
    return <Layout breadcrumbItems={["ACCUEIL"]} makeLastBreadcrumbActive={true} onBreadcrumbClick={(item, index) => {
      if (item === "ACCUEIL") {
        setShowNewsOnly(false);
      }
    }}>
        <div className="campaign-container">
          <div className="w-full p-4">
            <div className="relative flex items-center justify-center mb-6">
              <h1 className="text-2xl font-bold text-primary">Actualités</h1>
              <button onClick={() => setShowNewsOnly(false)} style={{
              position: "absolute",
              right: "15px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "2px solid #000000",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              cursor: "pointer"
            }}>
                <X size={16} color="#000000" strokeWidth={3} style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Info Flash */}
              <InfoFlash variant="mobile" />

              {/* Nos actualités */}
              <div className="w-full bg-primary rounded-lg shadow-sm p-6">
                <div className="text-center text-primary-foreground">
                  <h3 className="text-lg font-semibold mb-4">Nos actualités</h3>

                  <div className="space-y-4">
                    {newsData.map(news => <NewsBox key={news.id} news={news} variant="mobile" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>;
  }
  return <Layout breadcrumbItems={["ACCUEIL"]} onShowNews={() => setShowNewsOnly(true)}>
      <div className="campaign-container">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full sm:w-[820px] sm:ml-[22px]">
            <div className="min-h-[1000px] bg-white p-4 lg:p-8 rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold text-primary mb-8">Bienvenue sur mon site de campagne</h1>

              <div className="prose max-w-none space-y-6">
                <div className="flex items-start gap-6">
                  <img src={candidatePhoto} alt="Franck LONGO" className="block w-auto h-48 object-contain rounded-br-[25px] shadow-[2px_2px_8px_rgba(0,0,0,0.15)]" />
                  <div className="bg-orange-50 border-l-4 border-primary p-6 my-8">
                    <p className="text-lg flex-1">
                      Candidat aux élections municipales de Fontaine des{" "}
                      <a className="text-lg text-primary mb-4"> 15 & 22 mars 2026</a>, je vous présente ma vision et mes
                      projets pour notre commune.
                    </p>
                  </div>
                </div>

                <div id="intro" className="space-y-6 text-justify">
                  <p>
                    En 2020, vous avez été 61 % à faire confiance à mon équipe et notre projet municipal pour Fontaine.
                  </p>

                  <p>
                    Un projet programmatique fondé sur quatre priorités :{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">l'environnement</span>,{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">l'éducation</span>, la{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">sécurité</span> et la{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">gestion communale</span>. Il
                    reposait sur une équipe d'habitants de tous âges, de tous métiers et de sensibilités politiques
                    diverses, unis par une même volonté : servir Fontaine et ses habitants.
                  </p>

                  <p>
                    Aujourd'hui, je souhaite, avec mon équipe et votre soutien, poursuivre le travail engagé il y a six
                    ans, en sollicitant à nouveau votre confiance lors des élections municipales de 2026. Cette
                    confiance traduisait une volonté claire : tourner la page de 75 années de gestion communiste et
                    donner un nouveau souffle à notre ville, pour la rendre plus agréable à vivre, plus sûre, plus
                    durable et plus solidaire.
                  </p>

                  <p>
                    Vous nous avez fait confiance en exprimant votre lassitude face aux discours politiques sans effet
                    et votre attente d'actions concrètes et visibles au quotidien. Nous vous avons entendus et, depuis
                    six ans, nous avons agi. Fontaine a changé. Fontaine avance et continue d'avancer.
                  </p>

                  <p>Vous trouverez dans ce bilan la rétrospective de nos actions menées.</p>

                  <p>
                    Malgré un contexte particulièrement difficile - crise sanitaire, guerre en Ukraine, inflation,
                    explosion des coûts de l'énergie - nous avons tenu bon et respecté nos engagements : aucune
                    augmentation des taux communaux et une dette au plus bas depuis 50 ans à Fontaine.
                  </p>

                  <p>
                    Nous avons également fait des choix courageux. Il fallait remettre de l'ordre dans les finances de
                    la Ville, maîtriser nos dépenses et dégager de nouvelles marges pour investir à nouveau. Il y avait
                    urgence à entretenir nos bâtiments communaux, souvent laissés à l'abandon depuis des décennies. Le
                    résultat est là : Fontaine se transforme, pas à pas, sans alourdir la charge fiscale des Fontainois.
                  </p>

                  <p>
                    Parce que l'avenir de Fontaine se construit dès l'enfance,{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">l'école</span> a été notre
                    priorité . Nous avons investi en moyenne 800 000 € par an dans nos bâtiments scolaires, soit quatre
                    fois plus que durant les vingt années précédentes, et lancé la construction de la future école Rose
                    Valland. Nos enfants méritent le meilleur pour grandir, apprendre et s'épanouir dans de bonnes
                    conditions. Cet engagement nous l'avons tenu et poursuivi à travers de nombreuses améliorations dans
                    le domaine de l'éducation, et nous continuerons à le faire.
                  </p>

                  <p>
                    La préservation de{" "}
                    <span className="bg-primary text-primary-foreground px-1 rounded">l'environnement</span> s'est
                    imposée comme une priorité. Nous avons redonné toute sa place à la nature : plus de 2 000 arbres et
                    arbustes plantés, les parcs Jean Moulin et La Poya agrandis et le ruisseau « La petite Saône »
                    remise à ciel ouvert. De nombreux travaux ont été effectués pour améliorer nos réseaux souterrains,
                    réparer nos routes, rendre accessibles nos voies piétonnes, sécuriser les pistes cyclables et
                    moderniser l'éclairage public. Ces actions concrètes traduisent notre ambition : faire de Fontaine
                    une ville plus verte, plus respirable et plus résiliente. Et nous avons encore beaucoup à accomplir
                    dans ce sens.
                  </p>

                  <p>
                    Pour votre <span className="bg-primary text-primary-foreground px-1 rounded"> sécurité</span>, et
                    celle de nos enfants, nous avons agi avec responsabilité et pragmatisme. La tranquillité publique ne
                    peut plus être seulement l'affaire de l'État, elle nous concerne tous. Les effectifs de la police
                    municipale ont été renforcés de 30 %, les horaires élargis, et un plan de 70 caméras de
                    vidéoprotection a été déployé à la suite d'une large concertation avec les habitants. Fontaine ne
                    pouvait plus subir l'insécurité. Aujourd'hui, elle se protège et se reconstruit autour d'un principe
                    simple : vivre sereinement chez soi, dans sa ville.
                  </p>
                  <p>
                    Oui, Fontaine change, et ces changements, c’est vous qui les rendez possibles, par votre engagement,
                    votre confiance et votre exigence. Ce que nous avons accompli ensemble depuis 2020 est un véritable
                    contrat de confiance.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-primary p-6 my-8">
                    <p>
                      Et demain ? Nous voulons amplifier cette dynamique engagée depuis 2020. Les priorités du prochain
                      mandat seront résolument tournées vers le quotidien des habitants.{" "}
                    </p>

                    <p>
                      <span className="bg-primary text-primary-foreground px-1 rounded">l'accès aux soins</span>{" "}
                      d'abord, avec la venue prochaine de nouveaux médecins sur la commune.
                    </p>
                    <br />
                    <p>
                      <span className="bg-primary text-primary-foreground px-1 rounded">L'attractivité</span> du
                      centre-ville, ensuite, à travers la poursuite du projet des Portes du Vercors, qui accueillera de
                      nouveaux commerces, des restaurants, un cinéma et un pôle médical. De quoi repenser la qualité de
                      vie des Fontainois, en créant de nouveaux espaces de rencontre et de convivialité au cœur de la
                      Ville.
                    </p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-primary p-6 my-8">
                    <p>
                      <span className="bg-primary text-primary-foreground px-1 rounded">En mars 2026</span> je vous
                      proposerai de renouveler ce contrat, pour poursuivre ensemble cette dynamique de responsabilité et
                      de transformation, continuer à améliorer le cadre de vie des Fontainois, renforcer la sécurité de
                      chacun et construire, pas à pas, une ville plus apaisée, plus attractive et tournée vers l’avenir
                      de nos enfants.Je resterai, comme je crois l’avoir été depuis le début, à vos côtés, accessible,
                      engagé et à votre écoute.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="font-allura text-3xl">
                    <b>Franck Longo</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Hidden on mobile portrait, shown only on desktop */}
          <div className="hidden sm:block w-full sm:w-[290px] order-last sm:order-none">
            <div className="space-y-6">
              {/* Info Flash */}
              <InfoFlash variant="desktop" />

              {/* Orange Box */}
              <div className="w-full max-w-[250px] sm:w-[250px] h-[1260px] bg-primary rounded-lg shadow-sm mx-auto sm:mx-0 p-6 mt-8">
                <div className="text-center text-primary-foreground">
                  <h3 className="text-lg font-semibold mb-4">Fil d'actualités</h3>

                  {/* Scroll Up Arrow */}
                  {showScrollUp && <div className="flex justify-center mb-2">
                      <button className="text-white hover:text-white/70 transition-colors" onClick={scrollUp}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                      </button>
                    </div>}

                  <div ref={scrollContainerRef} className="h-[1100px] overflow-y-auto overflow-x-hidden w-[210px] mx-auto" onScroll={checkScrollButtons}>
                    <div className="space-y-4 min-h-[200px]">
                      {newsData.map(news => <NewsBox key={news.id} news={news} variant="desktop" />)}
                    </div>
                  </div>

                  {/* Scroll Down Arrow */}
                  {showScrollDown && <div className="flex justify-center mt-2">
                      <button className="text-white hover:text-white/70 transition-colors" onClick={scrollDown}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Index;