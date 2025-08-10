import { Hono } from 'hono';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';
import { getKnowledgeNewController } from './controllers/get-knowledge-new.controller.js';
import { postKnowledgeController } from './controllers/post-knowledge.controller.js';

interface Variables {
  userId: string;
}

export const router = new Hono<{ Variables: Variables }>();

router.get('/', (ctx) => {
  // MEMO: `ctx.get('userId')` によって、必要に応じて UserID を利用できる
  console.log('Signed-in :', ctx.get('userId'));

  return ctx.html(getAllKnowledgesController());
});

router.get('/knowledges/new', (ctx) => {
  return ctx.html(getKnowledgeNewController());
});

router.post('/knowledge', async (ctx) => {
  return await postKnowledgeController(ctx);
});
