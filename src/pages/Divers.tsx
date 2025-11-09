import React from "react";
import Layout from "@/components/Layout";
import { VolunteerForm } from "@/components/VolunteerForm";
const Divers: React.FC = () => {
  return <Layout breadcrumbItems={["Accueil", "INFOS/S'INVESTIR"]} showHeader={true}>
      <div className="campaign-container">
        <div className="min-h-[1000px] bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-primary mb-4">Recevoir des infos</h1>
          <div className="prose max-w-none">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-lg mb-6">
                Vous désirez être tenu informé directement des évènements concernant la campagne de Franck Longo,
                laissez vos coordonées (nom, prénom, mail, numéro de mobile) sur notre adresse mail :{" "}
                <a href="mailto:ensemblepourfontaine@gmail.com" className="responsive-text-lg text-primary hover:underline">
                  ensemblepourfontaine2026@gmail.com
                </a>
              </p>
            </div>
            <br />
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Vous désirez vous investir dans la campagne</h2>
              <VolunteerForm />
            </div>
            <br />
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Documents utiles</h2>
              <ul className="space-y-2 ml-6">
                <li>
                  •{" "}
                  <a href="#" className="text-primary hover:underline">
                    Profession de foi (PDF)
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-primary hover:underline">
                    Bulletin de vote (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Divers;