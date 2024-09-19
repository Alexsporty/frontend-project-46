#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
    const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
    const json1 = JSON.parse(file1);
    const json2 = JSON.parse(file2);
    const diff = JSON.stringify(json1) !== JSON.stringify(json2)
      ? 'Файлы отличаются'
      : 'Файлы идентичны';
      console.log(diff);
  });
program.parse(process.argv);
