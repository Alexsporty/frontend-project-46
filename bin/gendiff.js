#!/usr/bin/env node
import { program } from 'commander';
import genDiff, { parser } from '../phasad.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    try {
      const json1 = parser(filepath1, format);
      const json2 = parser(filepath2, format);
      if (!json1 || !json2) {
        throw new Error('One of the files could not be parsed.');
      }
      const diff = genDiff(json1, json2);
      console.log(diff);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.parse(process.argv);
