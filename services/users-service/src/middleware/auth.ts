import type { FastifyReply, FastifyRequest } from 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; role: string; telephone: string; type?: string };
    user: { sub: string; role: string; telephone: string; type?: string };
  }
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
  } catch {
    reply.status(401).send({ success: false, error: 'Non autorisé' });
  }
}

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
    if (request.user.role !== 'ADMIN') {
      reply.status(403).send({ success: false, error: 'Accès interdit' });
    }
  } catch {
    reply.status(401).send({ success: false, error: 'Non autorisé' });
  }
}
