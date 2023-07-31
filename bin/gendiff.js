#!/usr/bin/env node
import { Command } from 'commander';
import { compareFiles, makeTree } from '../index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and show a difference.')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .option('-f, --format <type>', 'output format')
  .action((path1, path2) => {
    console.log(makeTree(compareFiles(path1, path2)));
  });
program.parse();
