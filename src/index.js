import compareTrees from './compareTrees.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  try {
    const file1 = parser(filepath1);
    const file2 = parser(filepath2);
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
