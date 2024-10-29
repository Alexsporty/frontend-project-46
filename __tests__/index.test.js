import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Testing the function genDiff', () => {
  test('fileStylish', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('expectedFileStylish.txt'));
  });
  test('format Stylish', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(readFile('expectedFileStylish.txt'));
  });
  test('format Plain', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(readFile('expectedFilePlain.txt'));
  });
  test('format JSON', () => {
    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(readFile('expectedFileJson.txt'));
  });
});
