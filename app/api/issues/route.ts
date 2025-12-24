import { IssueController } from '@/lib/controllers/IssueController';

const controller = new IssueController();

export async function GET(req: Request) {
    return controller.list(req as any);
}

export async function POST(req: Request) {
    return controller.create(req as any);
}
