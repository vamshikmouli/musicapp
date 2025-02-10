import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';
import { saltAndHashPassword } from '@/utils/helper';

/**
 * GET: Fetch all staffs
 */
export async function GET(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const staffs = await prisma.staff.findMany();
    return NextResponse.json(staffs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staffs' },
      { status: 500 }
    );
  }
}

/**
 * POST: Create or update a staff.
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
    const existingStaff = await getExistingStaff(data.id);
    if (existingStaff) {
      return await updateStaff(existingStaff, data);
    }
    return await createNewStaff(data);
  } catch (error) {
    console.error('POST Error:', error);
    return errorResponse('Failed to save staff', 500);
  }
}

async function getExistingStaff(id?: string) {
  if (!id) return null;
  return prisma.staff.findUnique({
    where: { id },
    include: { user: true },
  });
}

async function updateStaff(existingStaff: any, data: any) {
  const existingUser = existingStaff.user;

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
        name: data.name || existingStaff.name,
      },
    });
  }

  const updatedStaff = await prisma.staff.update({
    where: { id: data.id },
    data: {
      ...data,
      joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
    },
  });
  return NextResponse.json(updatedStaff, { status: 200 });
}

async function createNewStaff(data: any) {
  let userId = await getOrCreateUser(data.email, data.name);
  const staffId = await generateStaffId();
  const staff = await prisma.staff.create({
    data: {
      ...data,
      userId,
      staffId,
      joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
    },
  });
  return NextResponse.json(staff, { status: 201 });
}

async function getOrCreateUser(email: string, contactPerson?: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return existingUser.id;

  const newUser = await prisma.user.create({
    data: {
      name: contactPerson || 'Default User',
      email,
      role: 'STAFF',
      hashPassword: saltAndHashPassword('qwerty'),
    },
  });
  return newUser.id;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * DELETE: Remove a staff by ID.
 */
export async function DELETE(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!staff) {
      return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
    }

    await prisma.staff.delete({ where: { id } });
    if (staff.user) {
      await prisma.user.delete({ where: { id: staff.user.id } });
    }

    return NextResponse.json(
      { message: 'Staff and associated user deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete Staff and user' },
      { status: 500 }
    );
  }
}

const generateStaffId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit number
    uniqueId = `LNS${randomNumber}T`;

    // Check if this ID already exists
    const existingStaff = await prisma.staff.findUnique({
      where: { staffId: uniqueId },
    });

    if (!existingStaff) isUnique = true; // Exit loop if unique
  }

  return uniqueId;
};
