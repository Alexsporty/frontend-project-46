import fs from 'fs';
import path, { dirname } from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const parser = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fullPath = path.join(__dirname, '..', '__fixtures__', filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(filepath);
  if (ext === '.json') {
    return JSON.parse(fileContent);
  } if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(fileContent);
  }
  throw new Error(`Unsupported format: ${filepath}`);
};
export default parser;
