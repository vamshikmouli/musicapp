'use server';

import axiosInstance from '@/lib/axios';
import { Student } from '@prisma/client';

const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const STUDENT_API_URL = `${APP_URL}/api/students`;

export const saveStudent = async (data: Partial<Student>) => {
  try {
    const res = await axiosInstance.post(STUDENT_API_URL, data);
    return res.data;
  } catch (error) {
    console.error('Error saving school:', error);
    throw error;
  }
};

export const getStudentsByBatchAndSchool = async (
  schoolId: string,
  batchId: string | null
) => {
  try {
    const res = await axiosInstance.get(
      `${STUDENT_API_URL}?schoolId=${schoolId}&batchId=${batchId}`
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching students by school and batch:', error);
    throw error;
  }
};

/**
 * Delete a Student by ID.
 * @param id - Student ID
 * @returns Response from API
 */
export const deleteStudent = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${STUDENT_API_URL}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};

/**
 * Get a student by ID.
 * @param id - student ID
 * @returns student data
 */
export const getStudentById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${STUDENT_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};
