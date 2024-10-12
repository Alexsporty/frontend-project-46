const genDiff = (file1, file2) => {
  const keys = [...new Set([...Object.keys(file1), ...Object.keys(file2)])];
  const sortedKeys = keys.sort();
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return ` + ${key} : ${file2[key]}`;
    } if (!Object.hasOwn(file2, key)) {
      return ` - ${key} : ${file1[key]}`;
    } if (file1[key] !== file2[key]) {
      return ` - ${key} : ${file1[key]}\n + ${key} : ${file2[key]}`;
    } if (file1[key] === file2[key]) {
      return `   ${key} : ${file1[key]}`;
    }
    return null;
  }).filter(Boolean).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
