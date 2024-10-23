import compareTrees from './compareTrees.js';
import parser from './parsers.js';
import formatStylish from './formatters/formatStylish.js';
import formatPlain from './formatters/formatPlain.js';

const genDiff = (filepath1, filepath2, format = 'structured') => {
  try {
    const file1 = parser(filepath1);
    const file2 = parser(filepath2);
    if (!file1 || !file2) {
      throw new Error('One of the files could not be parsed.');
    }
    const diff = compareTrees(file1, file2);
    if (format === 'plain') {
      return formatPlain(diff);
    }
    return formatStylish(diff);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
export default genDiff;
