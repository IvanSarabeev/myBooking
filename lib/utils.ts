import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import chalk from "chalk";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts the initials from a provided name.
 *
 * This function takes a full name as a string, splits it into individual words,
 * retrieves the first character of each word, combines them into a single string,
 * converts the result to uppercase, and limits the output to the first two characters.
 *
 * @param {string} name - The full name from which initials are to be extracted.
 * @returns {string} The uppercase initials derived from the given name, limited to two characters.
 */
export const getNameInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * A function for logging a message to the console with an optional prefix.
 *
 * @param {any} value - The message to log
 * @param {string} message - The message to log
 * @param {string} [level='error'] - Log level ('error', 'warn', 'debug', 'info')
 * @param {string} [prefix='Node Log: '] - The optional prefix to be displayed before the log message.
 */
export const logChalkMessage = (
  value: any,
  message: string = "",
  level: string = "error",
  prefix: string = "Node Log / ",
) => {
  const timestamp = new Date().toISOString();
  const messagePrefix = `[${timestamp}] ${prefix}`;
  const consoleLog = console.log;
  const logMessage = messagePrefix + message + " : ";

  const formattedValue =
    typeof value === "object" ? JSON.stringify(value) : value;

  switch (level.toLowerCase()) {
    case "error":
      consoleLog(chalk.red(logMessage), chalk.red(formattedValue));
      break;
    case "warning":
      consoleLog(chalk.yellow(logMessage), chalk.yellow(formattedValue));
      break;
    case "debug":
      consoleLog(chalk.bgMagenta(logMessage), chalk.bgMagenta(formattedValue));
      break;
    case "info":
      consoleLog(chalk.blue(logMessage), chalk.blue(formattedValue));
      break;
    default:
      consoleLog(chalk.green(logMessage), chalk.green(formattedValue));
  }
};
