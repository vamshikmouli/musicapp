'use server';

import { Batch, School } from '@prisma/client';
import axiosInstance from '@/lib/axios';

const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const SCHOOLS_API_URL = `${APP_URL}/api/schools`;
const BATCH_API_URL = `${APP_URL}/api/batch`;

export const saveSchool = async (data: Partial<School>) => {
  try {
    const res = await axiosInstance.post(SCHOOLS_API_URL, data);
    return res.data;
  } catch (error) {
    console.error('Error saving school:', error);
    throw error;
  }
};

/**
 * Get all schools.
 * @returns List of schools from API
 */
export const getAllSchools = async () => {
  try {
    const res = await axiosInstance.get(SCHOOLS_API_URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
};

/**
 * Get a school by ID.
 * @param id - School ID
 * @returns School data
 */
export const getSchoolById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${SCHOOLS_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching school:', error);
    throw error;
  }
};

/**
 * Delete a school by ID.
 * @param id - School ID
 * @returns Response from API
 */
export const deleteSchool = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${SCHOOLS_API_URL}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting school:', error);
    throw error;
  }
};

/**
 * Create a batches
 */
export const createdBatches = async (
  batches: Partial<Batch[]>,
  schoolId: string
) => {
  try {
    const res = await axiosInstance.post(BATCH_API_URL, { batches, schoolId });
    return res.data;
  } catch (error: any) {
    console.error('Error saving school:', error);
    const errorMessage = error.response.data.error || 'ccccccc';

    throw new Error(errorMessage);
  }
};

/**
 * Get batches by school
 */
export const getBatchesBySchool = async (schoolId: string) => {
  try {
    const res = await axiosInstance.get(
      `${BATCH_API_URL}?schoolId=${schoolId}`
    );
    return res.data.batches;
  } catch (error) {
    console.error('Error fetching batches:', error);
    throw error;
  }
};

export const deleteBatch = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${BATCH_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting batch:', error);
    throw error;
  }
};
