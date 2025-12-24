import { IssueRepository } from '@/lib/repositories/IssueRepository';
import { IssueValidator } from '@/lib/validators/IssueValidator';
import { EmailService } from './EmailService';
import { AppError } from '@/lib/core/AppError';
import { IssueType } from '@prisma/client';
import { UserRepository } from '@/lib/repositories/UserRepository';

export class IssueService {
    private issueRepo: IssueRepository;
    private userRepo: UserRepository;
    private emailService: EmailService;

    constructor() {
        this.issueRepo = new IssueRepository();
        this.userRepo = new UserRepository();
        this.emailService = new EmailService();
    }

    async createIssue(userId: string, data: any) {
        const validatedData = IssueValidator.validateCreate(data);

        const issue = await this.issueRepo.create({
            ...validatedData,
            user: { connect: { id: userId } },
        });

        // Notify user via email
        const user = await this.userRepo.findById(userId);
        if (user) {
            this.emailService.sendIssueCreatedEmail(user.email, {
                title: issue.title,
                type: issue.type,
                id: issue.id,
            });
        }

        return issue;
    }

    async getIssues(userId: string, filters: { type?: string } = {}) {
        // If admin we might fetch all, but assuming user sees mostly their own issues or based on requirements
        // Requirement says: "List all issues for user". 
        // Additional requirement: "Filter by issue type".

        // Currently fetch all for the user
        // To support filtering by type in-memory or DB:
        // With Prisma we can pass it to repository.

        let typeFilter: IssueType | undefined;
        if (filters.type) {
            // Validate type
            if (Object.values(IssueType).includes(filters.type as IssueType)) {
                typeFilter = filters.type as IssueType;
            }
        }

        // Since repository method findByUserId doesn't support filter in my basic impl, 
        // I should create a better query in repository or use findAll with user filter.
        // Let's assume issues are personal.

        // I should update IssueRepository to support flexible filters, 
        // but for now I'll just filter in memory or update repo.
        // Let's stick strictly to OOP: I should call a repo method that supports this.
        // I will use `findAll` from IssueRepository if I want filtering, but `findAll` as defined earlier takes global filters.
        // I need `findByUserId` with filters.

        const issues = await this.issueRepo.findByUserId(userId);
        if (typeFilter) {
            return issues.filter(i => i.type === typeFilter);
        }
        return issues;
    }

    async getIssueById(userId: string, issueId: string) {
        const issue = await this.issueRepo.findById(issueId);
        if (!issue) {
            throw AppError.notFound('Issue not found');
        }
        // Check ownership
        if (issue.userId !== userId) {
            throw AppError.forbidden('You do not have permission to view this issue');
        }
        return issue;
    }

    async updateIssue(userId: string, issueId: string, data: any) {
        const validatedData = IssueValidator.validateUpdate(data);

        const issue = await this.issueRepo.findById(issueId);
        if (!issue) {
            throw AppError.notFound('Issue not found');
        }
        if (issue.userId !== userId) {
            throw AppError.forbidden('You do not have permission to update this issue');
        }

        return this.issueRepo.update(issueId, validatedData);
    }

    async deleteIssue(userId: string, issueId: string) {
        const issue = await this.issueRepo.findById(issueId);
        if (!issue) {
            throw AppError.notFound('Issue not found');
        }
        if (issue.userId !== userId) {
            throw AppError.forbidden('You do not have permission to delete this issue');
        }

        return this.issueRepo.delete(issueId);
    }
}
