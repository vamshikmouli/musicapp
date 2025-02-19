import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

export function saltAndHashPassword(password: any) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export const calculateAge = (dob: string | Date): string => {
  if (!dob) return 'N/A';

  const birthDate = dayjs(dob);
  const now = dayjs();

  const years = now.diff(birthDate, 'year');
  const months = now.diff(birthDate.add(years, 'year'), 'month');

  return `${years} years ${months} months`;
};
