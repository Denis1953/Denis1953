import React from "react";
import Layout from "@/components/Layout";
import photo1 from "@/assets/act1-photo1.jpg";
import photo2 from "@/assets/act1-photo2.jpg";
import photo3 from "@/assets/act1-photo3.jpg";
import photo4 from "@/assets/act1-photo4.jpg";
import photo5 from "@/assets/act1-photo5.jpg";
import photoGroup from "@/assets/act1-photo-group.jpg";
const Act1 = () => {
  return (
    <Layout breadcrumbItems={["ACCUEIL", "ACTUALITÉS", "7 novembre, lancement de la campagne !"]}>
      <div className="campaign-container">
        <div className="w-full px-4 sm:px-8 max-w-full">
          <div className="min-h-[1000px] bg-white p-4 lg:p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-primary mb-8">7 novembre 2025, lancement de la campagne !</h1>

            <div className="prose max-w-none space-y-6">
              <p className="text-lg leading-relaxed">
                Grosse affluence vendredi 7 novembre salle Edmond Vigne pour le lancement de campagne. Plus de 300
                personnes ont accueilli Franck Longo par des applaudissements. On notait également la présence de
                nombreux maires et conseillers municipaux de communes voisines, mais également de plusieurs conseillers
                départementaux,tous venus soutenir sa candidature pour les prochaines élections municipales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 justify-items-center">
                <img
                  src={photo1}
                  alt="Échanges lors du lancement de campagne"
                  className="w-full h-[293px] object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "390px" }}
                />
                <img
                  src={photo2}
                  alt="Franck Longo avec les participants"
                  className="w-full h-[293px] object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "390px" }}
                />
                <img
                  src={photo3}
                  alt="Franck Longo au pupitre"
                  className="w-full h-[293px] object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "390px" }}
                />
              </div>

              <p className="text-lg leading-relaxed">
                Au pupitre Franck Longo a fait le bilan du mandat en énumérant une partie des centaines d'actions
                réalisées, en remerciant nominativement chacun des élus de la majorité appelés sur la scène. Il a
                ensuite annoncé officiellement qu'il sollicitait de nouveau la confiance des fontainois pour les
                prochaines élections municipales.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
                <img
                  src={photo4}
                  alt="Vue d'ensemble de la salle lors du lancement"
                  className="w-full h-[293px] object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "390px" }}
                />
                <img
                  src={photo5}
                  alt="L'équipe sur scène"
                  className="w-full h-[293px] object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "390px" }}
                />
              </div>

              <p className="text-lg leading-relaxed">
                Cette soirée s'est terminée par un jeu de questions réponses puis devant un buffet. Le public a ainsi pu
                échanger avec l'équipe de campagne en toute convivialité.
              </p>

              <div className="flex justify-center my-8">
                <img
                  src={photoGroup}
                  alt="Photo de groupe avec tous les participants"
                  className="w-full object-cover rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]"
                  style={{ maxWidth: "800px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Act1;
