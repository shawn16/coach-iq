import { getServerSession, Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

// Shape for a generic error response
interface ErrorResponse {
  error: string;
  details?: string;
}

// Type for the core logic of an authenticated API handler
// TSuccess is the type of the successful response body
type AuthenticatedRouteLogic<TSuccess = unknown> = (
  req: NextRequest,
  session: Session
) => Promise<NextResponse<TSuccess | ErrorResponse>>; // Logic can return success or a known error (e.g., validation)

/**
 * Wraps an API route's logic with session authentication and standardized error handling.
 *
 * @param req - The NextRequest object.
 * @param logic - An async function containing the core route logic.
 *                It receives the request and the authenticated session.
 *                It should return a NextResponse with either a TSuccess body or an ErrorResponse body.
 * @param options - Optional parameters.
 * @param options.actionDescription - A description of the action being performed.
 * @returns A NextResponse object, body will be TSuccess or ErrorResponse.
 */
export async function withAuthenticatedSession<TSuccess = unknown>(
  req: NextRequest,
  logic: AuthenticatedRouteLogic<TSuccess>,
  options?: {
    actionDescription?: string;
  }
): Promise<NextResponse<TSuccess | ErrorResponse>> {
  const actionDescription = options?.actionDescription || 'perform requested action';
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' } as ErrorResponse, { status: 401 });
    }
    return await logic(req, session); // Logic handles its own response structure (success or validation error)
  } catch (error) { // This catches unexpected errors in logic or session retrieval
    console.error(`Error ${actionDescription}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `Failed to ${actionDescription}`, details: errorMessage } as ErrorResponse,
      { status: 500 }
    );
  }
}
