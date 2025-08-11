// Knowledgeモデルをインポート（`../models/knowledge.model.js` が正しいパスか確認してください）
import type { Knowledge } from '../models/knowledge.model.js';
// Layoutコンポーネントをインポート
import { Layout } from './Layout.js';

// Hono/JSXを使用している場合、Fragmentも必要になることがあります
// import { Fragment } from 'hono/jsx'; // 必要であればコメントアウトを解除

// このコンポーネントが受け取るpropsの型を定義します。
// get-knowledge-edit.controller.tsx から knowledge が Knowledge型またはnullで渡されます。
type KnowledgeEditFeatureProps = {
  knowledge: Knowledge | null;
};

// KnowledgeEditFeature コンポーネントを修正
// { knowledge }: KnowledgeEditFeatureProps のようにpropsの型を明示します。
export function KnowledgeEditFeature({ knowledge }: KnowledgeEditFeatureProps) {
  // knowledge プロパティが存在するかどうかで、編集モードか新規作成モードかを判定します。
  const isEditing = knowledge !== null;
  const pageTitle = isEditing ? 'ナレッジの編集' : '新しいナレッジを作成';
  const buttonText = isEditing ? '更新する' : '投稿する';

  return (
    <Layout title={pageTitle}>
      {/*
        フォームのactionは /knowledges のままで、
        サーバー側（KnowledgeRepositoryのupsert関数）で
        knowledgeId の有無によって新規作成か更新かを判断する想定です。
        HTMLフォームのmethodはPOSTに限定されるため、POSTを使用します。
        もしPUT/PATCHを使いたい場合は、hidden inputで_methodフィールドを追加するか、
        JavaScriptでFetch APIなどを使って送信する必要があります。
      */}
      <form action="/knowledges" method="post">
        {/*
          編集モードの場合、既存の knowledgeId を hidden フィールドとして送信します。
          これにより、サーバー側でどのナレッジを更新すべきかを特定できます。
        */}
        {isEditing && <input name="knowledgeId" type="hidden" value={knowledge.knowledgeId} />}

        <div>
          {/* labelのfor属性とinputのid属性を対応させます（アクセシビリティのため） */}
          <label htmlFor="title">見出し</label>
          <input
            id="title"
            name="title"
            required
            // knowledgeが存在すればそのtitleプロパティの値を初期値としてセットします。
            // なければ空文字列をセットし、新規入力モードとします。
            type="text"
            value={knowledge ? knowledge.title : ''} // このフィールドは必須であることを示します
          />
        </div>
        <div>
          {/* labelのfor属性とtextareaのid属性を対応させます */}
          {/* Knowledgeモデルの本文フィールドは "content" を使用します */}
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            value={knowledge ? knowledge.content : ''}
          ></textarea>
        </div>
        <button type="submit">{buttonText}</button>
      </form>
    </Layout>
  );
}
