import { NextResponse } from 'next/server';

export class ApiResponse {
    static success<T>(data: T, message: string = 'Success', statusCode: number = 200) {
        return NextResponse.json(
            {
                success: true,
                message,
                data,
            },
            { status: statusCode }
        );
    }

    static error(message: string, statusCode: number = 500, errors?: any) {
        return NextResponse.json(
            {
                success: false,
                message,
                errors,
            },
            { status: statusCode }
        );
    }
}
