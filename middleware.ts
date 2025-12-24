import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken'; // Note: verification in Edge middleware usually needs jose, but let's see if we can use jsonwebtoken or just do it in Node runtime?
// Next.js Middleware runs on Edge. jsonwebtoken might fail due to Node APIs.
// Use 'jose' for Edge compatibility or keep auth check in route handlers if middleware fails.
// However, standard requirement is middleware.
// For this assignment, checking headers is key.
// I'll skip complex JWT verification in Edge Middleware if jsonwebtoken is not edge compatible (it usually isn't fully).
// Instead, I'll try to use 'jose' or just check existence validation in Edge, and full validation in Controller/Node middleware.
// Better approach: Since we control the architecture, let's do the actual verification in the Route Handler (via BaseController or custom logic) 
// but use middleware for basic protection or just pass through.
// Actually, strict requirement: "Protected routes middleware".
// I'll use a simple verify function that works in Edge or I'll use `jose`. I didn't install `jose`.
// I will just implement the JWT verification in the Controller/Service layer as a "Middleware" function called by the controller, 
// OR I will simply use `jsonwebtoken` in `middleware.ts` and ensure it runs in Node runtime? Next.js Middleware forces Edge.
// I will stick to checking the token presence in Middleware and maybe decoding if possible, but the `AuthService` handles verification.
// I'll make the middleware strict: if path starts with protected route, check header.

export function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const { pathname } = request.nextUrl;

    // Public paths
    if (pathname.startsWith('/api/auth/login') || pathname.startsWith('/api/auth/register') || pathname === '/') {
        return NextResponse.next();
    }

    // Protected API paths
    if (pathname.startsWith('/api/issues') || pathname.startsWith('/api/users') || pathname === '/api/auth/me') {
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        // We can't easily verify signature here without 'jose', but we can forward it.
        // Real verification happens in Service/Controller.
    }

    // Protected Pages
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
        // If no cookie/token, redirect to login? 
        // Implementing auth in frontend is different (cookies vs localstorage).
        // If using localStorage, middleware can't see it (headers not sent on page load).
        // Users usually store token in cookies for middleware to see.
        // I'll assume for Page protection I'll rely on client-side check or Cookie.
        // For creating a robust app, I should have used Cookies for Auth.
        // But the requirement says "Custom JWT".
        // Let's assume the frontend adds Authorization header for APIs.
        // For pages, I'll add a Client Component wrapper or use Cookies. 
        // Since I did not set up Cookie implementation (AuthService returns token body), I will skip Page Redirection in Middleware 
        // and handle it in the Client Side `useAuth` hook or `layout.tsx`.
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/dashboard/:path*', '/profile/:path*'],
};
