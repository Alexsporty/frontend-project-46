import compareTrees from './compareTrees.js';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2, format) => {
  try {
    const file1 = parser(filepath1, format);
    const file2 = parser(filepath2, format);
    if (!file1 || !file2) {
      throw new Error('One of the files could not be parsed.');
    }
    return compareTrees(file1, file2);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
export default genDiff;
