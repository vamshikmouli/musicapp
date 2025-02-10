'use server';

import { Staff } from '@prisma/client';
import axiosInstance from '@/lib/axios';

const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const STAFF_API_URL = `${APP_URL}/api/staff`;

export const saveStaff = async (data: Partial<Staff>) => {
  try {
    const res = await axiosInstance.post(STAFF_API_URL, data);
    return res.data;
  } catch (error) {
    console.error('Error saving staff:', error);
    throw error;
  }
};

/**
 * Get all staff.
 * @returns List of staff from API
 */
export const getAllStaff = async () => {
  try {
    const res = await axiosInstance.get(STAFF_API_URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

/**
 * Get a staff by ID.
 * @param id - Staff ID
 * @returns Staff data
 */
export const getStaffById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${STAFF_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

/**
 * Delete a Staff by ID.
 * @param id - Staff ID
 * @returns Response from API
 */
export const deleteStaff = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${STAFF_API_URL}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};
