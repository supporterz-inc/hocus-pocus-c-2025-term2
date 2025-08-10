import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  knowledges: Knowledge[];
  mode?: 'delete'; // 新しく追加
}

export function KnowledgeListFeature({ knowledges, mode }: Props) {
  const isDeleteMode = mode === 'delete';

  return (
    <Layout title="ナレッジ一覧">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/knowledges/new">新規作成</a>
        {isDeleteMode ? <a href="/">キャンセル</a> : <a href="/?mode=delete">削除</a>}
      </div>

      {isDeleteMode && (
        <form action="/knowledges/delete" method="post">
          <button style={{ marginTop: '10px', marginBottom: '10px' }} type="submit">
            選択したナレッジを削除
          </button>
          {knowledges.length ? (
            <ul>
              {knowledges.map((knowledge) => (
                <li key={knowledge.knowledgeId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input name="knowledgeIds" type="checkbox" value={knowledge.knowledgeId} />
                  <a href={`/knowledges/${knowledge.knowledgeId}`}>{knowledge.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <li>投稿済みのナレッジは 0 件です</li>
            </ul>
          )}
        </form>
      )}

      {!isDeleteMode &&
        (knowledges.length ? (
          <ul>
            {knowledges.map((knowledge) => (
              <li key={knowledge.knowledgeId}>
                <a href={`/knowledges/${knowledge.knowledgeId}`}>{knowledge.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>投稿済みのナレッジは 0 件です</li>
          </ul>
        ))}
    </Layout>
  );
}
