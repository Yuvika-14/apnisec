import { NextRequest } from 'next/server';
import { BaseController } from './BaseController';
import { IssueService } from '@/lib/services/IssueService';

export class IssueController extends BaseController {
    private issueService: IssueService;

    constructor() {
        super();
        this.issueService = new IssueService();
    }

    async create(req: NextRequest) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const body = await this.parseBody(req);
            return this.issueService.createIssue(userId, body);
        });
    }

    async list(req: NextRequest) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const type = req.nextUrl.searchParams.get('type') || undefined;
            return this.issueService.getIssues(userId, { type });
        });
    }

    async get(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const { id } = await params;
            return this.issueService.getIssueById(userId, id);
        });
    }

    async update(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const { id } = await params;
            const body = await this.parseBody(req);
            return this.issueService.updateIssue(userId, id, body);
        });
    }

    async delete(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
        return this.handleRequest(async () => {
            const userId = this.getUserId(req);
            const { id } = await params;
            return this.issueService.deleteIssue(userId, id);
        });
    }
}
