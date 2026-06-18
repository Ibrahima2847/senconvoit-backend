import { config } from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../../.env') });

import fastifyJwt from '@fastify/jwt';
import { AppError } from '@senconvoit/shared';
import Fastify from 'fastify';
import { authRoutes } from './modules/auth/auth.routes.js';
import prismaPlugin from './plugins/prisma.js';

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
});

fastify.get('/health', async () => ({ status: 'ok' }));

fastify.register(authRoutes, { prefix: '/auth' });

fastify.setErrorHandler((error, _request, reply) => {
  fastify.log.error(error);
  const statusCode = error instanceof AppError ? error.statusCode : (error.statusCode ?? 500);
  reply.status(statusCode).send({
    success: false,
    error: error.message ?? 'Internal Server Error',
    ...(error instanceof AppError && error.code ? { code: error.code } : {}),
  });
});

const PORT = Number(process.env.PORT_USERS ?? 3001);

try {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
