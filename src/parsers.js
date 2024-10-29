import yaml from 'js-yaml';

const parser = (filepath, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(filepath);

    case '.yml':
      return yaml.load(filepath);

    case '.yaml':
      return yaml.load(filepath);

    default:
      throw new Error(`Unsupported format: ${filepath}`);
  }
};
export default parser;
