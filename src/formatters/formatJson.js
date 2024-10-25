import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';

const formatter = (node, format) => {
  switch (format) {
    case 'stylish':
      return `{\n${formatStylish(node)}\n}`;

    case 'plain':
      return formatPlain(node);

    case 'json':
      return JSON.stringify(node);

    default:
      throw new Error(`Unknown format: '${format}'`);
  }
};

export default formatter;
