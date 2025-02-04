import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET: Fetch all schools or a single school by ID.
 */
export async function GET() {
  try {
    const schools = await prisma.school.findMany();
    return NextResponse.json(schools);
  } catch (error) {
    console.error('POST Error:', error);
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
  try {
    const data = await req.json();

    const school = data.id
      ? await prisma.school.update({
          where: { id: data.id },
          data: { name: data.name, location: data.location },
        })
      : await prisma.school.create({
          data: { name: data.name, location: data.location },
        });

    return NextResponse.json(school, { status: data.id ? 200 : 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to save school' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove a school by ID.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    await prisma.school.delete({ where: { id } });
    return NextResponse.json(
      { message: 'School deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete school' },
      { status: 500 }
    );
  }
}
