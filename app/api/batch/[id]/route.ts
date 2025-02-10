import { NextRequest, NextResponse } from 'next/server';
import { unauthorizedResponse, validateRequest } from '@/utils/apiHelper';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!validateRequest(req)) return unauthorizedResponse();
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }

    await prisma.batch.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Batch deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json(
      { error: 'Failed to delete batch' },
      { status: 500 }
    );
  }
}
