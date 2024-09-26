#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
    const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));
    const json1 = JSON.parse(file1);
    const json2 = JSON.parse(file2);
    const diff = genDiff(json1, json2);
    console.log(diff);
  });

program.parse(process.argv);

