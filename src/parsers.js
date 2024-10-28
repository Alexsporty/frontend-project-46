import yaml from 'js-yaml';

const parser = (filepath, ext) => {
  if (ext === '.json') {
    return JSON.parse(filepath);
  } if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(filepath);
  }
  throw new Error(`Unsupported format: ${filepath}`);
};
export default parser;
