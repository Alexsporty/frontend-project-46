const formatValue = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const replacer = ' ';
    const indent = replacer.repeat((depth + 1) * 4 - 2);
    const entries = Object.entries(value)
      .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${replacer.repeat(depth * 4 - 2)}}`;
  }
  return String(value);
};
const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(4 * depth);

  const result = diff.map((item) => {
    const { key, type } = item;
    const currentIndent = ' '.repeat(4 * depth - 2);;
    
    switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${formatValue(item.val, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${formatValue(item.val, depth + 1)}`;
      case 'updated':
        return `${currentIndent}- ${key}: ${formatValue(item.val1, depth + 1)}\n${currentIndent}+ ${key}: ${formatValue(item.val2, depth + 1)}`;
      case 'nested':
        return `${currentIndent}  ${key}: {\n${formatStylish(item.children, depth + 1)}\n${indent}}`;
      default:
        return `${currentIndent}  ${key}: ${formatValue(item.val, depth + 1)}`;
    }
  }).join('\n');

  return result;
};

export default formatStylish;
