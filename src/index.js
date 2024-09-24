const genDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  const sortedKeys = keys.sort();
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return ` + ${key} : ${obj2[key]}`;
    } if (!Object.hasOwn(obj2, key)) {
      return ` - ${key} : ${obj1[key]}`;
    } if (obj1[key] !== obj2[key]) {
      return ` - ${key} : ${obj1[key]}\n + ${key} : ${obj2[key]}`;
    } if (obj1[key] === obj2[key]) {
      return `   ${key} : ${obj1[key]}`;
    }
    return null;
  }).filter(Boolean).join('\n');
  return `{\n${result}\n}`;
};
export default genDiff;
