const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, path = '') => diff.map((item) => {
  const fullPath = path ? `${path}.${item.key}` : item.key;

  switch (item.type) {
    case 'added':
      return `Property '${fullPath}' was added with value: ${formatValue(item.val)}`;
    case 'removed':
      return `Property '${fullPath}' was removed`;
    case 'updated':
      return `Property '${fullPath}' was updated. From ${formatValue(item.val1)} to ${formatValue(item.val2)}`;
    case 'nested':
      return formatPlain(item.children, fullPath);
    default:
      return null;
  }
}).filter(Boolean).join('\n');

export default formatPlain;
