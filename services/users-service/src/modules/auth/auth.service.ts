import { PrismaClient } from '@prisma/client';
import { AuthTokens, ConflictError, UnauthorizedError } from '@senconvoit/shared';
import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import type { LoginDto, RegisterDto } from './auth.schema.js';

const ACCESS_TTL = '7d';
const REFRESH_TTL = '30d';
const ACCESS_TTL_SECONDS = 7 * 24 * 60 * 60;

export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly fastify: FastifyInstance,
  ) {}

  async register(dto: RegisterDto): Promise<AuthTokens> {
    const existing = await this.prisma.utilisateur.findUnique({
      where: { telephone: dto.telephone },
    });
    if (existing) {
      throw new ConflictError('Numéro de téléphone déjà utilisé');
    }

    const password_hash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.utilisateur.create({
      data: {
        nom: dto.nom,
        prenom: dto.prenom,
        telephone: dto.telephone,
        email: dto.email,
        password_hash,
      },
    });

    return this.generateTokens({ id: user.id, role: user.role, telephone: user.telephone });
  }

  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { telephone: dto.telephone },
    });
    if (!user) {
      throw new UnauthorizedError('Identifiants invalides');
    }

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedError('Identifiants invalides');
    }

    return this.generateTokens({ id: user.id, role: user.role, telephone: user.telephone });
  }

  generateTokens(params: { id: string; role: string; telephone: string }): AuthTokens {
    const payload = { sub: params.id, role: params.role, telephone: params.telephone };
    const accessToken = this.fastify.jwt.sign(payload, { expiresIn: ACCESS_TTL });
    const refreshToken = this.fastify.jwt.sign(
      { ...payload, type: 'refresh' },
      { expiresIn: REFRESH_TTL },
    );
    return { accessToken, refreshToken, expiresIn: ACCESS_TTL_SECONDS };
  }
}
