import type { Context } from 'hono';
import { KnowledgeEditFeature } from '../features/KnowledgeEditFeature.js';
import { Layout } from '../features/Layout.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export function getKnowledgeEditController() {
  return async (c: Context) => {
    const { knowledgeId } = c.req.param();
    if (typeof knowledgeId !== 'string') {
      return c.notFound();
    }
    const knowledge = await KnowledgeRepository.findById(knowledgeId).catch(() => null);

    if (!knowledge) {
      return c.notFound();
    }

    return c.html(
      <Layout title={knowledge.title}>
        <KnowledgeEditFeature knowledge={knowledge} />
      </Layout>,
    );
  };
}
