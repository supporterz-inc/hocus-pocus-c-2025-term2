import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  knowledge: Knowledge;
}

function parseMarkdown(text: string) {
  const lines = text.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue; // undefined または空文字はスキップ

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i}>{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      // 箇条書きはまとめてulにする簡単な処理
      const items = [];
      while (i < lines.length && lines[i]?.startsWith('- ')) {
        const itemLine = lines[i];
        if (itemLine) {
          items.push(<li key={i}>{itemLine.slice(2)}</li>);
        }
        i++;
      }
      i--; // ループで1行進めているので調整
      elements.push(<ul key={i}>{items}</ul>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{ color: '#666', fontStyle: 'italic', marginLeft: '1em' }}>
          {line.slice(2)}
        </blockquote>,
      );
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      // 簡易強調（**強調**）と斜体（*斜体*）の置換
      const parsed = [];
      let lastIndex = 0;
      const regex = /(\*\*.+?\*\*|\*.+?\*)/g;
      let match = regex.exec(line);

      while (match !== null) {
        if (match.index > lastIndex) {
          parsed.push(line.slice(lastIndex, match.index));
        }
        const matchText = match[0];
        if (matchText.startsWith('**')) {
          parsed.push(<strong key={`${i}-${match.index}`}>{matchText.slice(2, -2)}</strong>);
        } else if (matchText.startsWith('*')) {
          parsed.push(<em key={`${i}-${match.index}`}>{matchText.slice(1, -1)}</em>);
        }
        lastIndex = match.index + matchText.length;

        match = regex.exec(line);
      }
      if (lastIndex < line.length) {
        parsed.push(line.slice(lastIndex));
      }
      elements.push(<p key={i}>{parsed}</p>);
    }
  }
  return elements;
}

export function KnowledgeDetailFeature({ knowledge }: Props) {
  return (
    <Layout title={knowledge.title}>
      <article>
        <h1 className="text-[var(--font-size-32)] text-center mb-[var(--spacing-m)]">{knowledge.title}</h1>
        <div>{parseMarkdown(knowledge.content || '')}</div>

        <button
          className="absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onclick="window.location.href = '/'"
          type="button"
        >
          戻る
        </button>
      </article>
    </Layout>
  );
}
