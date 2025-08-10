import type { Context } from 'hono';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function postKnowledgeController(ctx: Context<{ Variables: { userId: string } }>) {
  const { content } = await ctx.req.parseBody<{ content: string }>();
  const authorId = ctx.get('userId');

  const knowledge = Knowledge.create(content, authorId);
  await KnowledgeRepository.upsert(knowledge);

  return ctx.redirect('/');
}
