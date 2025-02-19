import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({ where: { id } });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}
