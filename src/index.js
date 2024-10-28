import fs from 'fs';
import path from 'path';
import compareTrees from './compareTrees.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const fileContent = (filepath) => fs.readFileSync(fullPath(filepath), 'utf-8');
const getExt = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const file1 = parser(fileContent(filepath1), getExt(filepath1));
    const file2 = parser(fileContent(filepath2), getExt(filepath2));
    if (!file1 || !file2) {
      throw new Error('One of the files could not be parsed.');
    }
    const diff = compareTrees(file1, file2);

    return formatter(diff, format);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return `Error: ${error.message}`;
  }
};
export default genDiff;
