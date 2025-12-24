import { z } from 'zod';
import { AppError } from '@/lib/core/AppError';

export class AuthValidator {
    private static registerSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        name: z.string().min(2, 'Name must be at least 2 characters'),
    });

    private static loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    static validateRegister(data: any) {
        const result = AuthValidator.registerSchema.safeParse(data);
        if (!result.success) {
            const messages = result.error.errors.map((e) => e.message).join(', ');
            throw AppError.badRequest(messages);
        }
        return result.data;
    }

    static validateLogin(data: any) {
        const result = AuthValidator.loginSchema.safeParse(data);
        if (!result.success) {
            const messages = result.error.errors.map((e) => e.message).join(', ');
            throw AppError.badRequest(messages);
        }
        return result.data;
    }
}
