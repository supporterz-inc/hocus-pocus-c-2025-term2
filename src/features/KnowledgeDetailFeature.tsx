import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  knowledge: Knowledge;
  canEdit: boolean;
}

export function KnowledgeDetailFeature({ knowledge }: Props) {
  return (
    <Layout title={knowledge.title}>
      <article>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-800">{knowledge.title}</h1>
          <a
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            href={`/knowledges/${knowledge.knowledgeId}/edit`}
          >
            編集
          </a>
        </div>
        <div class="prose prose-sm mt-4 max-w-none text-gray-800" />
      </article>
    </Layout>
  );
}
