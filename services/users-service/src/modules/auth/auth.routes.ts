import { success } from '@senconvoit/shared';
import type { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema } from './auth.schema.js';
import { AuthService } from './auth.service.js';

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  const service = new AuthService(fastify.prisma, fastify);

  fastify.post('/register', async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: parsed.error.flatten() });
    }
    const tokens = await service.register(parsed.data);
    return reply.status(201).send(success(tokens, 'Compte créé avec succès'));
  });

  fastify.post('/login', async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: parsed.error.flatten() });
    }
    const tokens = await service.login(parsed.data);
    return reply.send(success(tokens));
  });
}
