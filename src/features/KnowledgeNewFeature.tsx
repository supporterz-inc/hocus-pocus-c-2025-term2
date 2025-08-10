import { Layout } from './Layout.js';

export function KnowledgeNewFeature() {
  return (
    <Layout title="ナレッジの新規作成">
      <form action="/knowledges" method="post">
        <div>
          <label for="title">見出し</label>
          <input id="title" name="title" type="text" />
        </div>
        <div>
          <label for="content">本文</label>
          <textarea id="content" name="content" rows={20}></textarea>
        </div>
        <button type="submit">投稿する</button>
      </form>
    </Layout>
  );
}
