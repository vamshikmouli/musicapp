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
        { error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    const staff = await prisma.staff.findUnique({ where: { id } });

    if (!staff) {
      return NextResponse.json({ error: 'staff not found' }, { status: 404 });
    }

    return NextResponse.json(staff, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}
