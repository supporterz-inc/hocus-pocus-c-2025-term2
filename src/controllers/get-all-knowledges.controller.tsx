import type { Context } from 'hono';
import { KnowledgeListFeature } from '../features/KnowledgeListFeature.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function getAllKnowledgesController(ctx: Context) {
  const knowledges = await KnowledgeRepository.getAll();
  const mode = ctx.req.query('mode');

  if (mode === 'delete') {
    return <KnowledgeListFeature knowledges={knowledges} mode="delete" />;
  }

  return <KnowledgeListFeature knowledges={knowledges} />;
}
