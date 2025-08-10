import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  knowledges: Knowledge[];
}

export function KnowledgeListFeature({ knowledges }: Props) {
  return (
    <Layout title="ナレッジ一覧">
      <a href="/knowledges/new">新規作成</a>

      {knowledges.length ? (
        <ul>
          {knowledges.map((knowledge) => (
            <li key={knowledge.knowledgeId}>{knowledge.content}</li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>投稿済みのナレッジは 0 件です</li>
        </ul>
      )}
    </Layout>
  );
}
