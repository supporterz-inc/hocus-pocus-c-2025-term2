import { Layout } from './Layout.js';

export function KnowledgeNewFeature() {
  return (
    <Layout title="ナレッジの新規作成">
      <form action="/knowledges" method="post">
        <div>
          <label for="title">見出し</label>
          <input id="title" name="title" required type="text" />
        </div>
        <div>
          <label for="content">本文</label>
          <textarea id="content" name="content" required rows={20}></textarea>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="ml-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            投稿する
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick="window.location.href = '/'"
            type="button"
          >
            戻る
          </button>
        </div>
      </form>
    </Layout>
  );
}
