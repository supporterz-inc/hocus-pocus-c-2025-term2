import { describe, expect, it } from 'vitest';
import { Knowledge } from './knowledge.model.js';

describe('Create Knowledge', () => {
  it('Knowledge が作成できる', () => {
    const content = 'This is a test content.';
    const authorId = 'test-author';
    const knowledge = Knowledge.create(content, authorId);

    expect(knowledge.content).toBe(content);
    expect(knowledge.authorId).toBe(authorId);
    expect(knowledge.createdAt).toEqual(knowledge.updatedAt);
  });
});

describe('Update Knowledge', () => {
  it('Knowledge が更新できる', () => {
    const original = Knowledge.create('This is an original content', 'test-author');
    const content = 'This is an updated content.';

    setTimeout(() => {
      const updated = Knowledge.update(original, content);

      expect(updated.knowledgeId).toBe(original.knowledgeId);
      expect(updated.content).toBe(content);
      expect(updated.authorId).toBe(original.authorId);
      expect(updated.createdAt).toEqual(original.createdAt);
      expect(updated.updatedAt).toBeGreaterThan(original.updatedAt);
    }, 100);
  });
});
