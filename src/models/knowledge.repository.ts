import { glob, readFile, unlink, writeFile } from 'node:fs/promises';

import type { Knowledge } from './knowledge.model.js';

async function findById(knowledgeId: string): Promise<Knowledge | null> {
  try {
    const content = await readFile(`./storage/${knowledgeId}.json`, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function getAll(): Promise<Knowledge[]> {
  const files = await Array.fromAsync(glob('./storage/**/*.json'));

  const knowledges = await Promise.all(files.map((file) => readFile(file, 'utf-8').then(JSON.parse)));

  return knowledges;
}

async function upsert(knowledge: Knowledge): Promise<void> {
  await writeFile(`./storage/${knowledge.knowledgeId}.json`, JSON.stringify(knowledge, null, 2));
}

async function deleteByKnowledgeId(knowledgeId: string): Promise<void> {
  try {
    await unlink(`./storage/${knowledgeId}.json`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

export const KnowledgeRepository = {
  findById,

  // biome-ignore lint/suspicious/noExplicitAny: TODO: (学生向け) 実装する
  getByAuthorId: (_: string): Promise<Knowledge[]> => undefined as any,

  getAll,

  upsert,

  deleteByKnowledgeId,
};
