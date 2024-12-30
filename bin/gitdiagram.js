#!/usr/bin/env node
//important, do not remove the above line
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';

const showIntro = () => {
    const title = chalk.bold.hex('#00FF00')('GitDiagram CLI');
    const description = chalk.green('Turn any GitHub repository into an interactive diagram for visualization in seconds.');
    const commands = `
        ${chalk.blue('Commands:')}
        ${chalk.yellow('generate')}    Generate a Git diagram for your repository
        ${chalk.yellow('help')}        Show help information
        ${chalk.yellow('version')}     Show the CLI version
    `;
    const footer = chalk.dim('Use "gitdiagram <command> --help" for more information.');

    console.log(
        boxen(
        `${title}\n\n${description}\n\n${commands}\n${footer}`,
        { padding: 1, borderColor: 'green', dimBorder: true }
        )
    );
};

// CLI setup using yargs
const argv = yargs(hideBin(process.argv))
  .scriptName('gitdiagram')
  .usage('Usage: gitdiagram <command> [options]')
  .command(
    'generate',
    'Generate a Git diagram for your repository',
    () => {},
    () => {
      console.log(chalk.green('Generating a Git diagram...'));
      // Add your logic for generating diagrams here
    }
  )
  .command(
    'version',
    'Show the CLI version',
    () => {},
    () => {
      console.log(chalk.blue('GitDiagram CLI version 1.0.1'));
    }
  )
  .middleware((argv) => {
    if (!argv._[0]) {
      showIntro();
      process.exit(0); // Exit after showing the intro
    }
  })
  .help('help')
  .fail((msg, err, yargs) => {
    if (err) throw err; // Show stack traces for unexpected errors
    console.error(chalk.red(msg));
    console.log(yargs.help());
    process.exit(1);
  })
  .argv;
