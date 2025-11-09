import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/LoadingSpinner";

const proxyRequestSchema = z.object({
  nom: z.string().trim().min(1, { message: "Le nom est requis" }).max(100),
  prenom: z.string().trim().min(1, { message: "Le prénom est requis" }).max(100),
  adresse: z.string().trim().min(1, { message: "L'adresse est requise" }).max(300),
  telephone: z.string()
    .trim()
    .min(1, "Le téléphone est requis")
    .transform(val => val.replace(/\s/g, ''))
    .refine(
      (val) => /^\+?[0-9]{8,15}$/.test(val),
      { message: "Format invalide. Ex: 0612345678 ou +33612345678" }
    ),
  email: z.string().trim().email({ message: "Email invalide" }).max(255).optional().or(z.literal("")),
  tours: z.array(z.string()).min(1, { message: "Veuillez sélectionner au moins un tour" }),
});

type ProxyRequestFormData = z.infer<typeof proxyRequestSchema>;

const ProxyRequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTours, setSelectedTours] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProxyRequestFormData>({
    resolver: zodResolver(proxyRequestSchema),
    defaultValues: {
      tours: [],
    },
  });

  const handleTourChange = (tour: string, checked: boolean) => {
    const newTours = checked
      ? [...selectedTours, tour]
      : selectedTours.filter((t) => t !== tour);
    setSelectedTours(newTours);
    setValue("tours", newTours, { shouldValidate: true });
  };

  const onSubmit = async (data: ProxyRequestFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-proxy-notification", {
        body: data,
      });

      if (error) {
        throw error;
      }

      toast.success("Demande envoyée avec succès ! Nous vous recontacterons bientôt.");
      reset();
      setSelectedTours([]);
    } catch (error: any) {
      console.error("Error submitting proxy request:", error);
      toast.error("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <p className="text-sm text-muted-foreground mb-4">
        <span className="text-[hsl(var(--campaign-orange))]">*</span> Saisie obligatoire
      </p>
      
      <div>
        <Label htmlFor="nom">
          Nom <span className="text-[hsl(var(--campaign-orange))]">*</span>
        </Label>
        <Input
          id="nom"
          {...register("nom")}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.nom && (
          <p className="text-sm text-red-600 mt-1">{errors.nom.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="prenom">
          Prénom <span className="text-[hsl(var(--campaign-orange))]">*</span>
        </Label>
        <Input
          id="prenom"
          {...register("prenom")}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.prenom && (
          <p className="text-sm text-red-600 mt-1">{errors.prenom.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="adresse">
          Adresse (numéro, rue et ville) <span className="text-[hsl(var(--campaign-orange))]">*</span>
        </Label>
        <Input
          id="adresse"
          {...register("adresse")}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.adresse && (
          <p className="text-sm text-red-600 mt-1">{errors.adresse.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="telephone">
          Téléphone <span className="text-[hsl(var(--campaign-orange))]">*</span>
        </Label>
        <Input
          id="telephone"
          type="tel"
          {...register("telephone")}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.telephone && (
          <p className="text-sm text-red-600 mt-1">{errors.telephone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Adresse mail</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-3 block">
          Pour quel tour avez-vous besoin d'un mandataire? <span className="text-[hsl(var(--campaign-orange))]">*</span>
        </Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tour1"
              checked={selectedTours.includes("1er tour le 15 mars")}
              onCheckedChange={(checked) =>
                handleTourChange("1er tour le 15 mars", checked === true)
              }
              disabled={isSubmitting}
            />
            <Label
              htmlFor="tour1"
              className="text-sm font-normal cursor-pointer"
            >
              1er tour le 15 mars
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tour2"
              checked={selectedTours.includes("2ème tour le 22 mars")}
              onCheckedChange={(checked) =>
                handleTourChange("2ème tour le 22 mars", checked === true)
              }
              disabled={isSubmitting}
            />
            <Label
              htmlFor="tour2"
              className="text-sm font-normal cursor-pointer"
            >
              2ème tour le 22 mars
            </Label>
          </div>
        </div>
        {errors.tours && (
          <p className="text-sm text-red-600 mt-1">{errors.tours.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            Envoi en cours...
          </span>
        ) : (
          "Envoyer la demande"
        )}
      </Button>
      
      <p className="text-xs italic text-black mt-4 leading-relaxed">
        Vous ne souhaitez plus recevoir d'e-mails ou sms de notre part ? Désinscription possible à tout moment par mail à
        ensemblepourfontaine2026@gmail.com Vous disposez d'un droit d'accès, de modification, de suppression et de rectification
        des données vous concernant, ainsi que d'autres droits conformément au Règlement Général sur la Protection des Données.
        Pour en savoir plus sur les traitements de données à caractère personnel n'hésitez pas à nous contacter à
        ensemblepourfontaine2026@gmail.com
      </p>
    </form>
  );
};

export default ProxyRequestForm;
