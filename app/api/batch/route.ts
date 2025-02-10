import { prisma } from '@/lib/prisma';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const body = await req.json();

    const { batches, schoolId } = body;

    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(batches)) {
      console.error('Invalid batches format:', batches);
      return NextResponse.json(
        { error: 'batches must be an array' },
        { status: 400 }
      );
    }

    if (!batches.length) {
      return NextResponse.json(
        { error: 'At least one batch is required' },
        { status: 400 }
      );
    }

    const operations = batches.map(async (batch) => {
      if (batch.id) {
        return prisma.batch.update({
          where: { id: batch.id },
          data: {
            name: batch.name,
            startTime: batch.startTime,
            endTime: batch.endTime,
          },
        });
      } else {
        // If no ID, create new batch
        return prisma.batch.create({
          data: {
            name: batch.name,
            startTime: batch.startTime,
            endTime: batch.endTime,
            schoolId,
          },
        });
      }
    });

    const results = await Promise.all(operations);

    return NextResponse.json(
      { message: 'Batches processed successfully', results },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing batches:', error);
    return NextResponse.json(
      { error: 'Failed to process batches' },
      { status: 500 }
    );
  }
}

/**
 * GET: Get batches by school ID.
 */

export async function GET(req: NextRequest) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get('schoolId');

    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }
    const batches = await prisma.batch.findMany({
      where: { schoolId },
      orderBy: { startTime: 'asc' }, // Optional: Sort by startTime
    });

    return NextResponse.json({ batches }, { status: 200 });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
