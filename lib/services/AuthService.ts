import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/lib/repositories/UserRepository';
import { AuthValidator } from '@/lib/validators/AuthValidator';
import { AppError } from '@/lib/core/AppError';
import { EmailService } from './EmailService';

export class AuthService {
    private userRepo: UserRepository;
    private emailService: EmailService;
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
    private readonly REFRESH_SECRET = process.env.REFRESH_SECRET || 'super-refresh-secret';

    constructor() {
        this.userRepo = new UserRepository();
        this.emailService = new EmailService();
    }

    async register(data: any) {
        const validatedData = AuthValidator.validateRegister(data);

        const existingUser = await this.userRepo.findByEmail(validatedData.email);
        if (existingUser) {
            throw AppError.badRequest('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const user = await this.userRepo.create({
            email: validatedData.email,
            password: hashedPassword,
            name: validatedData.name,
            role: 'USER',
        });

        const token = this.generateToken(user.id);

        // Send email asynchronously
        this.emailService.sendWelcomeEmail(user.email, user.name);

        return { user: this.sanitizeUser(user), token };
    }

    async login(data: any) {
        const validatedData = AuthValidator.validateLogin(data);

        const user = await this.userRepo.findByEmail(validatedData.email);
        if (!user) {
            throw AppError.unauthorized('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        if (!isMatch) {
            throw AppError.unauthorized('Invalid email or password');
        }

        const token = this.generateToken(user.id);

        return { user: this.sanitizeUser(user), token };
    }

    async getProfile(userId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw AppError.notFound('User not found');
        }
        return this.sanitizeUser(user);
    }

    private generateToken(userId: string): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId }, this.REFRESH_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            throw AppError.unauthorized('Invalid or expired token');
        }
    }

    private sanitizeUser(user: any) {
        const { password, ...rest } = user;
        return rest;
    }
}
