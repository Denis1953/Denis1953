import React from "react";
import Layout from "@/components/Layout";
import ProxyRequestForm from "@/components/ProxyRequestForm";
const Procurations: React.FC = () => {
  return (
    <Layout breadcrumbItems={["Accueil", "Procurations"]} showHeader={true}>
      <div className="campaign-container">
        <div className="min-h-[1000px] bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-primary mb-8">Procurations</h1>
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Informations sur les procurations pour les élections municipales des 15 & 22 mars 2026 à Fontaine.
            </p>

            <div className="bg-orange-50 border-l-4 border-primary p-6 mb-8">
              <h2 className="text-xl font-semibold text-primary mb-3">Dates importantes</h2>
              <ul className="space-y-2">
                <li>
                  <strong>1er tour :</strong> Dimanche 15 mars 2026 de 8h00 à 19h00
                </li>
                <li>
                  <strong>2ème tour (si nécessaire) :</strong> Dimanche 22 mars 2026 mêmes horaires
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Comment faire une procuration ?</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg mb-2 font-bold">1. Où faire sa procuration ?</h3>
                    <ul className="space-y-1 ml-6">
                      <li>• Au commissariat de police</li>
                      <li>• À la gendarmerie</li>
                      <li>• Au tribunal d'instance</li>
                      <li>
                        • En ligne sur{" "}
                        <a
                          href="https://www.maprocuration.gouv.fr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          www.maprocuration.gouv.fr
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2 font-bold">2. Quand faire sa procuration ?</h3>
                    <p>
                      La procuration peut être établie jusqu'à la veille du scrutin, mais il est recommandé de s'y
                      prendre à l'avance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2 font-bold">3. Qui peut recevoir votre procuration ?</h3>
                    <ul className="space-y-1 ml-6">
                      <li className="">• Un électeur inscrit dans la même commune</li>
                      <li>• Une personne de confiance</li>
                      <li>• Le mandataire ne peut détenir qu'une seule procuration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Pièces à fournir</h2>
                <ul className="space-y-2 ml-6">
                  <li>
                    • <b>Pièce d'identité</b> en cours de validité
                  </li>
                  <li>
                    • <b>Formulaire de procuration</b> à télécharger et/ou remplir ici :{" "}
                    <a
                      href="https://www.service-public.gouv.fr/particuliers/vosdroits/R12675"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      CERFA n°14952*03
                    </a>
                  </li>
                  <li>
                    • <b>Informations sur le mandataire</b> (nom, prénom, adresse)
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  Vous votez par correspondance mais vous n'avez pas de mandataire
                </h2>
                <p className="mb-6">
                  Vous devez voter par procuration mais vous n'avez personne pour voter pour vous ? Nous vous 
                  fournirons une personne de confiance qui le fera à votre place. Remplissez le questionnaire 
                  ci-dessous et nous vous recontacterons.
                </p>
                <ProxyRequestForm />
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Besoin d'aide ?</h3>
                <p className="text-blue-700">
                  Contactez la mairie de Fontaine pour toute question relative aux procurations ou aux modalités de
                  vote.
                </p>
                <br />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Vous ne pourrez pas vous déplacer au bureau de vote ?
                </h3>
                <p className="text-blue-700">
                  Contactez-nous par mail ou téléphone et nous assurerons votre transport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Procurations;
