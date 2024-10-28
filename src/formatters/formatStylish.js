const formatValue = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const replacer = ' ';
    const indent = replacer.repeat((depth + 1) * 4 - 2);
    const entries = Object.entries(value)
      .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${replacer.repeat(depth * 4 - 2)}  }`;
  }
  return String(value);
};

const formatStylish = (diff) => {
  const iter = (data, depth = 1) => {
    const indent = ' '.repeat(4 * depth);
    const currentIndent = ' '.repeat(4 * depth - 2);

    const result = data.map((item) => {
      const { key, type } = item;

      switch (type) {
        case 'added':
          return `${currentIndent}+ ${key}: ${formatValue(item.val, depth)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${formatValue(item.val, depth)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${formatValue(item.val1, depth)}\n${currentIndent}+ ${key}: ${formatValue(item.val2, depth)}`;
        case 'nested':
          return `${currentIndent}  ${key}: {\n${iter(item.children, depth + 1)}\n${indent}}`;
        case 'same':
          return `${currentIndent}  ${key}: ${formatValue(item.val, depth)}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }).join('\n');

    return result;
  };
  return `{\n${iter(diff, 1)}\n}`;
};

export default formatStylish;
