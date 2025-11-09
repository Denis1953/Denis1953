import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const volunteerSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100),
  email: z.string().trim().email("Email invalide").max(255).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(1, "Le téléphone est requis")
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => /^\+?[0-9]{8,15}$/.test(val), { message: "Format invalide. Ex: 0612345678 ou +33612345678" }),
  activities: z.array(z.string()).min(1, "Sélectionnez au moins une activité"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const ACTIVITIES = [
  "J’accepte de recevoir des informations concernant la liste Ensemble pour Fontaine 2026.",
  "Je souhaite organiser une réunion à mon domicile afin d’échanger avec Franck LONGO et son équipe.",
  "Je suis prêt à aider Franck LONGO et son équipe dans le cadre des élections municipales.",
  "J’accepte de rejoindre le comité de soutien de la liste Ensemble pour Fontaine 2026 conduite par Franck LONGO et j’accepte que mon nom soit diffusé.",
];

export const VolunteerForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      activities: [],
    },
  });

  const selectedActivities = watch("activities") || [];

  const handleActivityChange = (activity: string, checked: boolean) => {
    const newActivities = checked
      ? [...selectedActivities, activity]
      : selectedActivities.filter((a) => a !== activity);
    setValue("activities", newActivities, { shouldValidate: true });
  };

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-volunteer-notification", {
        body: {
          name: data.name,
          email: data.email || undefined,
          phone: data.phone,
          activities: data.activities,
        },
      });

      if (error) {
        console.error("Error submitting volunteer form:", error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      toast.success("Votre candidature a été envoyée avec succès !");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-3">Devenez bénévole</h3>
      <p className="mb-4">
        Rejoignez notre équipe de bénévoles pour participer à la campagne. Plusieurs missions sont possibles selon vos
        disponibilités.
        <br />
        Enregistrez-vous ci-dessous et vous serez recontactés :
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input id="name" {...register("name")} className="mt-1" placeholder="Votre nom" disabled={isSubmitting} />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email (optionnel)</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1"
            placeholder="votre.email@exemple.fr"
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className="mt-1"
            placeholder="06 12 34 56 78"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <Label className="mb-3 block">
            Activités qui vous intéressent <span className="text-destructive">*</span>
          </Label>
          <br />
          <div className="space-y-3">
            {ACTIVITIES.map((activity) => (
              <div key={activity} className="flex items-start space-x-2">
                <Checkbox
                  id={activity}
                  checked={selectedActivities.includes(activity)}
                  onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor={activity}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {activity}
                </label>
              </div>
            ))}
          </div>
          {errors.activities && <p className="text-sm text-destructive mt-1">{errors.activities.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || selectedActivities.length === 0}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Valider ma candidature"
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
    </div>
  );
};
