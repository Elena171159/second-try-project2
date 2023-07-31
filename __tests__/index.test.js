import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { compareFiles, makeTree } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const expected = readFileSync(getFixturePath('filExpected.txt'), 'utf-8');
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
test('simple using', () => {
  expect(makeTree(compareFiles(file1, file2))).toEqual(expected);
});
