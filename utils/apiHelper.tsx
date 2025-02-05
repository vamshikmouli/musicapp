import { NextRequest, NextResponse } from 'next/server';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

/**
 * Validate API key from request headers.
 * @param req - NextRequest object
 * @returns boolean - True if API key is valid, false otherwise
 */
export const validateRequest = (req: NextRequest): boolean => {
  const apiKey = req.headers.get('x-api-key');
  return apiKey === API_SECRET_KEY;
};

/**
 * Parse JSON request body safely.
 * @param req - NextRequest object
 * @returns Parsed data or an error response
 */
export const parseRequestBody = async (req: NextRequest) => {
  try {
    return await req.json();
  } catch (error) {
    console.error('Invalid JSON:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
};

/**
 * Handle unauthorized requests.
 * @returns NextResponse with 401 status
 */
export const unauthorizedResponse = () =>
  NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
