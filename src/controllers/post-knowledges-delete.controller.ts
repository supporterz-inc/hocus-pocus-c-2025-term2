import type { Context } from 'hono';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function postKnowledgesDeleteController(ctx: Context) {
  const body = await ctx.req.parseBody();
  console.log(body);
  let knowledgeIdsToDelete: string[] = [];

  const ids = body['knowledgeIds[]'];

  // フォームからの入力が単一の文字列か配列かで処理を分ける
  if (typeof ids === 'string') {
    knowledgeIdsToDelete = [ids];
  } else if (Array.isArray(ids)) {
    knowledgeIdsToDelete = ids.map(String); // 念のため文字列に変換
  }

  console.log('削除リクエスト受信:', knowledgeIdsToDelete);

  for (const knowledgeId of knowledgeIdsToDelete) {
    await KnowledgeRepository.deleteByKnowledgeId(knowledgeId);
  }

  return ctx.redirect('/');
}
