import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/core/ApiResponse';
import { AppError } from '@/lib/core/AppError';
import { globalRateLimiter } from '@/lib/core/RateLimiter';
import jwt from 'jsonwebtoken';

export abstract class BaseController {
    // Helper to safely execute logic and handle errors
    protected async handleRequest(
        fn: () => Promise<NextResponse | any>
    ): Promise<NextResponse> {
        try {
            const result = await fn();
            // If the result is already a NextResponse, return it
            if (result instanceof NextResponse) {
                return result;
            }
            // Otherwise assume it's data and return success
            return ApiResponse.success(result);
        } catch (error: any) {
            console.error('API Error:', error);

            if (error instanceof AppError) {
                return ApiResponse.error(error.message, error.statusCode);
            }

            return ApiResponse.error('Internal Server Error', 500, error.message);
        }
    }

    // Helper to parse JSON body safely
    protected async parseBody(req: NextRequest) {
        try {
            return await req.json();
        } catch (e) {
            throw AppError.badRequest('Invalid JSON body');
        }
    }

    // Helper to get User ID from header (set by middleware or manually verified here)
    protected getUserId(req: NextRequest): string {
        // 1. Rate Limiting Check
        let ip = req.headers.get('x-forwarded-for') || 'unknown';
        if (ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }

        if (ip === '::1') ip = '127.0.0.1';

        const rateLimit = globalRateLimiter.check(ip);

        if (!rateLimit.allowed) {
            throw AppError.tooManyRequests('Rate limit exceeded');
        }

        // 2. Auth Check
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw AppError.unauthorized('User not authenticated');
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key') as { userId: string };
            return decoded.userId;
        } catch (err) {
            throw AppError.unauthorized('Invalid token');
        }
    }
}
