const isObject = (value) => typeof value === 'object' && value !== null;

const formatValue = (value, depth) => {
  if (isObject(value)) {
    const indent = ' '.repeat((depth + 1) * 4);
    const entries = Object.entries(value).map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${entries.join('\n')}\n${' '.repeat(depth * 4)}}`;
  }
  return String(value);
};

export default formatValue;
