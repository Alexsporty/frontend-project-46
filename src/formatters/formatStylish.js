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
const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(4 * depth);
  const currentIndent = ' '.repeat(4 * (depth - 1));

  const result = diff.map((item) => {
    const { key, type } = item;
    const typeIndent = ' '.repeat(4 * depth - 2);
    
    switch (type) {
      case 'added':
        return `${typeIndent}+ ${key}: ${formatValue(item.val, depth)}`;
      case 'removed':
        return `${typeIndent}- ${key}: ${formatValue(item.val, depth)}`;
      case 'updated':
        return `${typeIndent}- ${key}: ${formatValue(item.val1, depth)}\n${typeIndent}+ ${key}: ${formatValue(item.val2, depth)}`;
      case 'nested':
        return `${typeIndent}  ${key}: {\n${formatStylish(item.children, depth + 1)}\n${indent}}`;
      default:
        return `${typeIndent}  ${key}: ${formatValue(item.val, depth)}`;
    }
  }).join('\n');

  return `{\n${result}\n${currentIndent}}`;
};

export default formatStylish;
