import { SelectOption } from '@/utils/helper';

export const genderOptions: SelectOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const standardOptions: SelectOption[] = [
  { value: 'Pre KG', label: 'Pre KG' },
  { value: 'LKG', label: 'LKG' },
  { value: 'UKG', label: 'UKG' },
  { value: '1st STD', label: '1st STD' },
  { value: '2nd STD', label: '2nd STD' },
  { value: '3rd STD', label: '3rd STD' },
  { value: '4th STD', label: '4th STD' },
  { value: '5th STD', label: '5th STD' },
];

import { z } from 'zod';

export const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Student name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  fatherPhone: z
    .string()
    .min(10, 'Phone number is required')
    .max(15, 'Invalid phone number'),
  fatherName: z.string().min(1, 'Father name is required'),
  motherName: z.string().optional(),
  motherPhone: z.string().optional(),
  gender: z.string().min(1, 'Gender is required'),
  standard: z.string().optional(),
  DOB: z
    .string()
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();
      const dayDifference = today.getDate() - dob.getDate();
      const ageCorrected =
        monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)
          ? age - 1
          : age;

      return ageCorrected >= 3;
    }, 'Student must be at least 3 years old')
    .refine((dateStr) => {
      const dob = new Date(dateStr);
      const today = new Date();
      return dob <= today;
    }, 'Date of Birth cannot be in the future'),
});

export default studentSchema;
