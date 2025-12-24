import { z } from 'zod';
import { AppError } from '@/lib/core/AppError';
import { IssueType } from '@prisma/client';

export class IssueValidator {
    private static createSchema = z.object({
        title: z.string().min(3, 'Title must be at least 3 characters'),
        description: z.string().min(10, 'Description must be at least 10 characters'),
        type: z.nativeEnum(IssueType, {
            message: 'Invalid issue type. Must be CLOUD_SECURITY, RETEAM_ASSESSMENT, or VAPT',
        }),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
        status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
    });

    private static updateSchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.nativeEnum(IssueType).optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
        status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
    });

    static validateCreate(data: any) {
        const result = IssueValidator.createSchema.safeParse(data);
        if (!result.success) {
            const messages = result.error.issues.map((e) => e.message).join(', ');
            throw AppError.badRequest(messages);
        }
        return result.data;
    }

    static validateUpdate(data: any) {
        const result = IssueValidator.updateSchema.safeParse(data);
        if (!result.success) {
            const messages = result.error.issues.map((e) => e.message).join(', ');
            throw AppError.badRequest(messages);
        }
        return result.data;
    }
}
