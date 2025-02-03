'use server';

import { prisma } from '@/lib/prisma';
import { ISchool } from '../enities/school';

export const createOrUpdateSchool = async (data: ISchool) => {
  try {
    if (data.id) {
      const updatedSchool = await prisma.school.update({
        where: { id: String(data.id) },
        data: {
          name: data.name,
          location: data.location,
        },
      });
      return updatedSchool;
    } else {
      const newSchool = await prisma.school.create({
        data: {
          name: data.name,
          location: data.location,
        },
      });
      return newSchool;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllSchools = async (): Promise<ISchool[]> => {
  try {
    const schools = await prisma.school.findMany();
    return schools;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSchoolById = async (id: string): Promise<ISchool | null> => {
  try {
    const school = await prisma.school.findUnique({
      where: { id },
    });
    return school;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSchool = async (id: string): Promise<boolean> => {
  try {
    await prisma.school.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateSchool = async (
  id: string,
  data: Partial<ISchool>
): Promise<ISchool | null> => {
  try {
    const school = await prisma.school.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
      },
    });
    return school;
  } catch (error) {
    console.error(error);
    return null;
  }
};
