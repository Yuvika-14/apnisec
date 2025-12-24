import { Resend } from 'resend';
import { AppError } from '@/lib/core/AppError';

export class EmailService {
    private resend: Resend;
    private fromEmail: string;

    constructor() {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn('RESEND_API_KEY is not set. Email service will not work gracefully.');
        }
        this.resend = new Resend(apiKey || 're_123'); // Fallback to avoid crash during init
        this.fromEmail = 'onboarding@resend.dev'; // Replace with verified domain in production
    }

    async sendWelcomeEmail(to: string, name: string) {
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to,
                subject: 'Welcome to ApniSec Dashboard',
                html: `
          <h1>Welcome, ${name}!</h1>
          <p>Thank you for registering with ApniSec. We are glad to have you on board.</p>
          <p>Visit your dashboard to manage security assessments.</p>
        `,
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
            // Don't block registration if email fails
        }
    }

    async sendIssueCreatedEmail(to: string, issue: { title: string; type: string; id: string }) {
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to,
                subject: `New Issue Created: ${issue.title}`,
                html: `
          <h1>New Issue Created</h1>
          <p><strong>Type:</strong> ${issue.type}</p>
          <p><strong>Title:</strong> ${issue.title}</p>
          <p>Your issue has been logged successfully with ID: ${issue.id}.</p>
        `,
            });
        } catch (error) {
            console.error('Failed to send issue email:', error);
        }
    }
}
