const chalk = require("chalk");
const logger = console.log;

export const info = (msg) => {
  logger(chalk.cyan(msg));
};

export const success = (msg) => {
  logger(chalk.green(msg));
};

export const warn = (msg) => {
  logger(chalk.yellow(msg));
};

export const error = (msg) => {
  logger(chalk.red(msg));
};
