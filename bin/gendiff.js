#!/usr/bin/env node
import { program } from 'commander';
import { genDiff } from '../phasad.js';


program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f, --format <type>', 'output format', 'structured')
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'structured';
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse(process.argv);
