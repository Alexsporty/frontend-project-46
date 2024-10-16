import formatValue from './formatters/stylish.js';

const isObject = (value) => typeof value === 'object' && value !== null;

const compareTrees = (obj1, obj2, depth = 1) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
  const indent = ' '.repeat(depth * 4);

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!(key in obj2)) {
      return `${indent}- ${key}: ${formatValue(value1, depth)}`;
    }
    if (!(key in obj1)) {
      return `${indent}+ ${key}: ${formatValue(value2, depth)}`;
    }
    if (isObject(value1) && isObject(value2)) {
      return `${indent}  ${key}: {\n${compareTrees(value1, value2, depth + 1)}\n${indent}  }`;
    }
    if (value1 !== value2) {
      return `${indent}- ${key}: ${formatValue(value1, depth)}\n${indent}+ ${key}: ${formatValue(value2, depth)}`;
    }
    return `${indent}  ${key}: ${formatValue(value1, depth)}`;
  });
  return result.join('\n');
};
export default compareTrees;
