import type { Context } from 'hono';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export function PutKnowledgeController() {
  return async (c: Context) => {
    const { knowledgeId } = c.req.param();
    if (typeof knowledgeId !== 'string') {
      return c.notFound();
    }
    const { title, body } = await c.req.parseBody();

    const originalKnowledge = await KnowledgeRepository.findById(knowledgeId).catch(() => null);
    if (!originalKnowledge) {
      return c.notFound();
    }

    // TODO: (学生向け) バリデーションを追加する
    // TODO: (学生向け) authorId のチェックを追加する

    const updatedKnowledge = Knowledge.update(originalKnowledge, title as string, body as string);
    await KnowledgeRepository.upsert(updatedKnowledge);

    return c.redirect(`/knowledges/${knowledgeId}`);
  };
}
