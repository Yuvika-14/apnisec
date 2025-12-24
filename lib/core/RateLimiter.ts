interface RateLimitStore {
    count: number;
    resetTime: number;
}

export class RateLimiter {
    private store: Map<string, RateLimitStore>;
    private limit: number;
    private windowMs: number;

    constructor(limit: number = 100, windowMs: number = 15 * 60 * 1000) {
        this.store = new Map();
        this.limit = limit;
        this.windowMs = windowMs;
    }

    public check(identifier: string): { allowed: boolean; remaining: number; reset: number } {
        const now = Date.now();
        const record = this.store.get(identifier);

        if (!record || now > record.resetTime) {
            this.store.set(identifier, {
                count: 1,
                resetTime: now + this.windowMs,
            });
            return {
                allowed: true,
                remaining: this.limit - 1,
                reset: now + this.windowMs,
            };
        }

        if (record.count >= this.limit) {
            return {
                allowed: false,
                remaining: 0,
                reset: record.resetTime,
            };
        }

        record.count += 1;
        return {
            allowed: true,
            remaining: this.limit - record.count,
            reset: record.resetTime,
        };
    }

    // Clean up expired entries to prevent memory leak
    public cleanup() {
        const now = Date.now();
        for (const [key, value] of this.store.entries()) {
            if (now > value.resetTime) {
                this.store.delete(key);
            }
        }
    }
}

// Singleton instance for global rate limiting if needed
export const globalRateLimiter = new RateLimiter();
