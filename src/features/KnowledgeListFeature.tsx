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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
          }}
        >
          <button
            class=" bottom-10 left-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick="window.location.href='/knowledges/new'"
            type="button"
          >
            新規作成
          </button>

          {isDeleteMode ? (
            <button
              class=" bottom-10 right-10 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onclick="window.location.href='/'"
              type="button"
            >
              キャンセル
            </button>
          ) : (
            <button
              class=" bottom-10 right-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onclick="window.location.href='/?mode=delete'"
              type="button"
            >
              削除
            </button>
          )}
        </div>
        <div>
          {isDeleteMode && (
            <form action="/knowledges/delete" method="post">
              <button style={{ marginTop: '10px', marginBottom: '10px' }} type="submit">
                選択したナレッジを削除
              </button>
              {knowledges.length ? (
                <ul>
                  {knowledges.map((knowledge) => (
                    <li key={knowledge.knowledgeId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input name="knowledgeIds[]" type="checkbox" value={knowledge.knowledgeId} />
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
        </div>
        <div>
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
        </div>
      </div>
    </Layout>
  );
}
