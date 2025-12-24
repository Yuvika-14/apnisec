import { BaseRepository } from './BaseRepository';
import { Issue, Prisma, IssueType } from '@prisma/client';

export class IssueRepository extends BaseRepository {
    async create(data: Prisma.IssueCreateInput): Promise<Issue> {
        return this.db.issue.create({
            data,
        });
    }

    async findById(id: string): Promise<Issue | null> {
        return this.db.issue.findUnique({
            where: { id },
        });
    }

    async findByUserId(userId: string): Promise<Issue[]> {
        return this.db.issue.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAll(filters?: { type?: IssueType }): Promise<Issue[]> {
        return this.db.issue.findMany({
            where: filters,
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id: string, data: Prisma.IssueUpdateInput): Promise<Issue> {
        return this.db.issue.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Issue> {
        return this.db.issue.delete({
            where: { id },
        });
    }
}
