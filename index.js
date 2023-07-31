import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const findTheUltimatePath = (fileP) => {
  const currDir = process.cwd();
  const filePath = path.resolve(currDir, fileP).trim();
  return filePath;
};
const compareFiles = (path1, path2) => {
  const data1 = JSON.parse(fs.readFileSync(findTheUltimatePath(path1), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(findTheUltimatePath(path2), 'utf-8'));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = [...keys1, ...keys2].sort();
  const res = _.uniq(unionKeys).map((key) => {
    const isInFirst = _.has(data1, key);
    const isInSecond = _.has(data2, key);
    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);
    if (isInFirst && !isInSecond) return { name: key, status: 'deleted', value: value1 };
    if (!isInFirst && isInSecond) return { name: key, status: 'added', value: value2 };
    if ((isInFirst && isInSecond) && (value1 !== value2)) {
      return {
        name: key, status: 'changed', oldValue: value1, newValue: value2,
      };
    }
    return { name: key, status: 'unchanged', value: value1 };
  });
  return res;
};
const makeTree = (mas) => {
  const tree = mas.map((line) => {
    switch (line.status) {
      case 'added':
        return `  + ${line.name}: ${line.value}`;
      case 'deleted':
        return `  - ${line.name}: ${line.value}`;
      case 'unchanged':
        return `    ${line.name}: ${line.value}`;
      case 'changed':
        return `  - ${line.name}: ${line.oldValue}\n  + ${line.name}: ${line.newValue}`;
      default:
        throw new Error('Invalid type');
    }
  });
  return `{\n${tree.join('\n')}\n}`;
};
export { makeTree, compareFiles };
