import { Database } from '@/lib/core/Database';
import { PrismaClient } from '@prisma/client';

export abstract class BaseRepository {
    protected db: PrismaClient;

    constructor() {
        this.db = Database.getInstance().prisma;
    }
}
