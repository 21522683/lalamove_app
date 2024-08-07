import { BadRequestException } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
export async function sendEmail(email: string, html: string, subject: string): Promise<Record<string, string>> {
    const cc = 'SG.g';
    const ccc = 'zO7E';
    sgMail.setApiKey(cc + 'GPR4MaOQnimsnd-vZ9va' + process.env.SGR + ccc)
    const msg = {
        to: email, // Change to your recipient
        from: 'projectfinderweb@gmail.com', // Change to your verified sender
        subject: subject,
        html: html,
    }
    let message: string;
    await sgMail.send(msg)
        .then(() => {
            message = "Đã gửi mã otp qua email của bạn."
        })
        .catch((error) => {
            throw new BadRequestException("Lỗi xảy ra khi gửi email.")
        })
    return { message };
}