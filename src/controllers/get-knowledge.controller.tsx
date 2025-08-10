import type { Context } from 'hono';
import { KnowledgeDetailFeature } from '../features/KnowledgeDetailFeature.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function getKnowledgeController(ctx: Context) {
  const { knowledgeId } = ctx.req.param();

  if (!knowledgeId) {
    return ctx.notFound();
  }

  const knowledge = await KnowledgeRepository.findById(knowledgeId);

  if (!knowledge) {
    return ctx.notFound();
  }

  return ctx.html(<KnowledgeDetailFeature knowledge={knowledge} />);
}
