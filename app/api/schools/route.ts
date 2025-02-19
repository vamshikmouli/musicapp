import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';
import { saltAndHashPassword } from '@/utils/helper';
import { UserRole } from '@prisma/client';

/**
 * GET: Fetch all schools or a single school by ID.
 */
export async function GET(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const schools = await prisma.school.findMany();
    return NextResponse.json(schools);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

/**
 * POST: Create or update a school.
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
    const existingSchool = await getExistingSchool(data.id);
    if (existingSchool) {
      return await updateSchool(existingSchool, data);
    }
    return await createNewSchool(data);
  } catch (error) {
    console.error('POST Error:', error);
    return errorResponse('Failed to save school', 500);
  }
}

async function getExistingSchool(id?: string) {
  if (!id) return null;
  return prisma.school.findUnique({
    where: { id },
    include: { user: true },
  });
}

async function updateSchool(existingSchool: any, data: any) {
  const existingUser = existingSchool.user;

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
        name: data.contactPerson || existingSchool.name,
      },
    });
  }

  const updatedSchool = await prisma.school.update({
    where: { id: data.id },
    data: { ...data },
  });
  return NextResponse.json(updatedSchool, { status: 200 });
}

async function createNewSchool(data: any) {
  let userId = await getOrCreateUser(data.email, data.contactPerson, 'SCHOOL');
  const school = await prisma.school.create({ data: { ...data, userId } });
  return NextResponse.json(school, { status: 201 });
}

export async function getOrCreateUser(
  email: string,
  contactPerson?: string,
  role?: UserRole
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({
    data: {
      name: contactPerson || 'Default User',
      email,
      role: role ?? 'PARENT',
      hashPassword: saltAndHashPassword('qwerty'),
    },
  });
  return newUser.id;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * DELETE: Remove a school by ID.
 */
export async function DELETE(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    const school = await prisma.school.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    await prisma.school.delete({ where: { id } });
    if (school.user) {
      await prisma.user.delete({ where: { id: school.user.id } });
    }

    return NextResponse.json(
      { message: 'School and associated user deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete school and user' },
      { status: 500 }
    );
  }
}
