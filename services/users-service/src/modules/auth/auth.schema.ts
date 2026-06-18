import { z } from 'zod';

export const registerSchema = z.object({
  nom: z.string().min(1, 'Nom requis'),
  prenom: z.string().min(1, 'Prénom requis'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  email: z.string().email('Email invalide').optional(),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const loginSchema = z.object({
  telephone: z.string().min(1, 'Téléphone requis'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
