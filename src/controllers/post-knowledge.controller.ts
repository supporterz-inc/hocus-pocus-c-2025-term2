import type { Context } from 'hono';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function postKnowledgeController(ctx: Context<{ Variables: { userId: string } }>) {
  const { title, content } = await ctx.req.parseBody<{ title: string; content: string }>();
  const authorId = ctx.get('userId');

  const knowledge = Knowledge.create(title, content, authorId);
  await KnowledgeRepository.upsert(knowledge);

  return ctx.redirect('/');
}
