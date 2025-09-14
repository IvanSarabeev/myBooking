import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
