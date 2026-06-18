export enum Role {
  PASSAGER = 'PASSAGER',
  CONDUCTEUR = 'CONDUCTEUR',
  CHAUFFEUR = 'CHAUFFEUR',
  ADMIN = 'ADMIN',
}

export enum TrajetStatut {
  PLANIFIE = 'PLANIFIE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  ANNULE = 'ANNULE',
}

export enum ReservationStatut {
  EN_ATTENTE = 'EN_ATTENTE',
  CONFIRMEE = 'CONFIRMEE',
  ANNULEE = 'ANNULEE',
  TERMINEE = 'TERMINEE',
}

export enum ChauffeurStatut {
  ACTIF = 'ACTIF',
  SUSPENDU = 'SUSPENDU',
  EN_MISSION = 'EN_MISSION',
}

export enum DemandeStatut {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTEE = 'ACCEPTEE',
  REFUSEE = 'REFUSEE',
  EN_COURS = 'EN_COURS',
  TERMINEE = 'TERMINEE',
}

export enum PaiementMethode {
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE_MONEY',
  FREE_MONEY = 'FREE_MONEY',
  ESPECES = 'ESPECES',
}

export enum PaiementStatut {
  EN_ATTENTE = 'EN_ATTENTE',
  REUSSI = 'REUSSI',
  ECHOUE = 'ECHOUE',
  REMBOURSE = 'REMBOURSE',
}

export enum TypeCible {
  CONDUCTEUR = 'CONDUCTEUR',
  PASSAGER = 'PASSAGER',
  CHAUFFEUR = 'CHAUFFEUR',
}

export enum NotificationType {
  RESERVATION = 'RESERVATION',
  PAIEMENT = 'PAIEMENT',
  MESSAGE = 'MESSAGE',
  TRAJET = 'TRAJET',
  SYSTEME = 'SYSTEME',
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

export interface JwtPayload {
  sub: string;
  role: Role;
  telephone: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
