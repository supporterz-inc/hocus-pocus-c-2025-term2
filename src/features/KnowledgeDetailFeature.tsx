import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  knowledge: Knowledge;
}

export function KnowledgeDetailFeature({ knowledge }: Props) {
  return (
    <Layout title={knowledge.title}>
      <article>
        <h1>{knowledge.title}</h1>
        <div>{knowledge.content}</div>
      </article>
    </Layout>
  );
}
