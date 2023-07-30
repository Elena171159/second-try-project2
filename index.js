import { Command } from 'commander';

const program = new Command();

function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new commander.InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }
  
  // The previous value passed to the custom processing is used when processing variadic values.
  function mySum(value, total) {
    return total + myParseInt(value);
  }
  
  program
    .command('add')
    .argument('<first>', 'integer argument', myParseInt)
    .argument('[second]', 'integer argument', myParseInt, 1000)
    .action((first, second) => {
      console.log(`${first} + ${second} = ${first + second}`);
    });
  
  program
    .command('sum')
    .argument('<value...>', 'values to be summed', mySum, 0)
    .action((total) => {
      console.log(`sum is ${total}`);
    });
  
  program.parse();
