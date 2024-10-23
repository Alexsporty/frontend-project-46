const isObject = (value) => typeof value === 'object' && value !== null;

const compareTrees = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!(key in obj2)) {
      return { key, type: 'removed', val: value1 };
    }
    if (!(key in obj1)) {
      return { key, type: 'added', val: value2 };
    }
    if (isObject(value1) && isObject(value2)) {
      return { key, type: 'nested', children: compareTrees(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        key, type: 'updated', val1: value1, val2: value2,
      };
    }
    return { key, type: 'same', val: value1 };
  });
  return result;
};
export default compareTrees;
