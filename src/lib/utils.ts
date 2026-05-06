import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes with clsx logic
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to 2 decimal places if needed
 */
export function formatNum(num: number): string {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

/**
 * Grade Scale Definitions
 */
export const GRADES_US = [
  { label: 'A+', min: 97, gpa: 4.0 },
  { label: 'A', min: 93, gpa: 4.0 },
  { label: 'A-', min: 90, gpa: 3.7 },
  { label: 'B+', min: 87, gpa: 3.3 },
  { label: 'B', min: 83, gpa: 3.0 },
  { label: 'B-', min: 80, gpa: 2.7 },
  { label: 'C+', min: 77, gpa: 2.3 },
  { label: 'C', min: 73, gpa: 2.0 },
  { label: 'C-', min: 70, gpa: 1.7 },
  { label: 'D+', min: 67, gpa: 1.3 },
  { label: 'D', min: 63, gpa: 1.0 },
  { label: 'D-', min: 60, gpa: 0.7 },
  { label: 'F', min: 0, gpa: 0.0 },
];

export const GRADES_INDIA_CBSE = [
  { label: 'A1', min: 91, gp: 10 },
  { label: 'A2', min: 81, gp: 9 },
  { label: 'B1', min: 71, gp: 8 },
  { label: 'B2', min: 61, gp: 7 },
  { label: 'C1', min: 51, gp: 6 },
  { label: 'C2', min: 41, gp: 5 },
  { label: 'D', min: 33, gp: 4 },
  { label: 'E', min: 0, gp: 0 },
];

export function getLetterGrade(percentage: number, system: 'US' | 'INDIA' = 'US') {
  const scale = system === 'US' ? GRADES_US : GRADES_INDIA_CBSE;
  return scale.find((g) => percentage >= g.min)?.label || 'F';
}
