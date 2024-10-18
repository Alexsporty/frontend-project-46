#!/usr/bin/env node
import { program } from 'commander';
import { genDiff } from '../phasad.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, 'yaml');
    console.log(diff);
  });

program.parse(process.argv);
