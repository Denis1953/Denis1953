-- Supprimer la politique INSERT dangereuse actuelle
DROP POLICY IF EXISTS "System can insert admin users" ON public.admin_users;

-- Politique INSERT : bloquer complètement les insertions via l'application
-- Les comptes admin doivent être créés manuellement dans le backend
CREATE POLICY "Block all inserts via application"
  ON public.admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- Politique UPDATE : permettre à chaque admin de modifier uniquement son propre compte
CREATE POLICY "Admin users can update own data"
  ON public.admin_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Politique DELETE : permettre à chaque admin de supprimer uniquement son propre compte
CREATE POLICY "Admin users can delete own data"
  ON public.admin_users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);