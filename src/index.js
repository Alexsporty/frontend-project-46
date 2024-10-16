import compareTrees from './compareTrees.js';

const genDiff = (file1, file2) => `{\n${compareTrees(file1, file2)}\n}`;

export default genDiff;
