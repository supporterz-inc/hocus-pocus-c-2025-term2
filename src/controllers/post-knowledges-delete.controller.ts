import type { Context } from 'hono';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function postKnowledgesDeleteController(ctx: Context) {
  const body = await ctx.req.parseBody();
  let knowledgeIdsToDelete: string[] = [];

  // フォームからの入力が単一の文字列か配列かで処理を分ける
  if (typeof body['knowledgeIds'] === 'string') {
    knowledgeIdsToDelete = [body['knowledgeIds']];
  } else if (Array.isArray(body['knowledgeIds'])) {
    knowledgeIdsToDelete = body['knowledgeIds'].map(String); // 念のため文字列に変換
  }

  for (const knowledgeId of knowledgeIdsToDelete) {
    await KnowledgeRepository.deleteByKnowledgeId(knowledgeId);
  }

  return ctx.redirect('/');
}
