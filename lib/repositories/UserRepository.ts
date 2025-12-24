import { BaseRepository } from './BaseRepository';
import { User, Prisma } from '@prisma/client';

export class UserRepository extends BaseRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.db.user.create({
            data,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.db.user.update({
            where: { id },
            data,
        });
    }
}
