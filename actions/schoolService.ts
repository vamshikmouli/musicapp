'use server';

import axios from 'axios';
import { ISchool } from './enities/school';

const APP_URL = 'http://localhost:3000';
const SCHOOLS_API_URL = `${APP_URL}/api/schools`;

export const saveSchool = async (data: ISchool) => {
  try {
    const res = await axios.post(SCHOOLS_API_URL, data);
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
    const res = await axios.get(SCHOOLS_API_URL);
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
    const res = await axios.get(`${SCHOOLS_API_URL}/${id}`);
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
    const res = await axios.delete(`${SCHOOLS_API_URL}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting school:', error);
    throw error;
  }
};
