import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath, format) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  if (format === 'json') {
    return JSON.parse(fileContent);
  } if (format === 'yaml' || format === 'yml') {
    return yaml.load(fileContent);
  }
  throw new Error(`Unsupported format: ${format}`);
};
export default parser;
