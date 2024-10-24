const formatValue = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const indent = ' '.repeat((depth + 1) * 4 - 2);
    const entries = Object.entries(value)
      .map(([key, val]) => `${indent}  ${key}: ${formatValue(val, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${' '.repeat(depth * 4)}}`;
  }
  return String(value);
};
const formatStylish = (diff, depth = 1) => {
  const indent = (level) => ' '.repeat(level * 4 - 2);

  const result = diff.map((item) => {
    const { key, type } = item;
    const currentIndent = ' '.repeat(4 * depth - 2);;

    switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${formatValue(item.val, depth)}`;
      case 'removed':
        return `${currentIndent}- ${key}: ${formatValue(item.val, depth)}`;
      case 'updated':
        return `${currentIndent}- ${key}: ${formatValue(item.val1, depth)}\n${currentIndent}+ ${key}: ${formatValue(item.val2, depth)}`;
      case 'nested':
        return `${currentIndent}${key}: {\n${formatStylish(item.children, depth + 1)}\n${indent(depth)}}`;
      default:
        return `${currentIndent}  ${key}: ${formatValue(item.val, depth)}`;
    }
  }).join('\n');

  return result;
};

export default formatStylish;
