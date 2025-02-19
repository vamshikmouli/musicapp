import { prisma } from '@/lib/prisma';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateUser } from '../schools/route';

/**
 * GET: Fetch student by school and batch
 */
export async function GET(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  const schoolId = req.nextUrl.searchParams.get('schoolId');
  const batchId = req.nextUrl.searchParams.get('batchId');
  if (!schoolId) {
    return NextResponse.json({ error: 'Missing schoolId' }, { status: 400 });
  }

  try {
    const students = await prisma.student.findMany({
      where: {
        schoolId: schoolId,
        ...(batchId ? { batchId: batchId } : null),
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

/**
 * POST: Create or update a student.
 */
export async function POST(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();

  try {
    const data = await req.json();
    if (!data.email) {
      return errorResponse('Email is required', 400);
    }
    if (data.email === 'admin@admin.com') {
      return errorResponse('Already this email exists', 400);
    }
    const existingStudent = await getExistingStudent(data.id);
    if (existingStudent) {
      return await updateStudent(existingStudent, data);
    }
    return await createNewStudent(data);
  } catch (error) {
    console.error('POST Error:', error);
    return errorResponse('Failed to save student', 500);
  }
}

async function getExistingStudent(id?: string) {
  if (!id) return null;
  return prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });
}

async function updateStudent(existingStudent: any, data: any) {
  const existingUser = existingStudent.user;

  if (existingUser) {
    const emailExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailExists && emailExists.id !== existingUser.id) {
      return errorResponse('Email is already in use by another user', 400);
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: data.email,
        name: data.contactPerson || existingStudent.name,
      },
    });
  }

  const updatedStudent = await prisma.student.update({
    where: { id: data.id },
    data: { ...data, DOB: data.DOB ? new Date(data.DOB) : null },
  });
  return NextResponse.json(updatedStudent, { status: 200 });
}

async function createNewStudent(data: any) {
  let userId = await getOrCreateUser(data.email, data.contactPerson, 'PARENT');
  const lastStudent = await prisma.student.findFirst({
    orderBy: { studentId: 'desc' },
    select: { studentId: true },
  });
  let newIdNumber = 1;
  if (lastStudent?.studentId) {
    const match = lastStudent.studentId.match(/\d+/);
    if (match) {
      newIdNumber = parseInt(match[0]) + 1;
    }
  }
  const formattedNumber = newIdNumber.toString().padStart(3, '0');
  const newStudentId = `LNS${formattedNumber}S`;
  const student = await prisma.student.create({
    data: {
      ...data,
      userId,
      DOB: data.DOB ? new Date(data.DOB) : null,
      studentId: newStudentId,
    },
  });
  return NextResponse.json(student, { status: 201 });
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * DELETE: Remove a student by ID.
 */
export async function DELETE(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    await prisma.student.delete({ where: { id } });
    if (student.user) {
      await prisma.user.delete({ where: { id: student.user.id } });
    }

    return NextResponse.json(
      { message: 'Student and associated user deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete student and user' },
      { status: 500 }
    );
  }
}
