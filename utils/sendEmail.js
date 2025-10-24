import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
    if (!to) return;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"MathHacks" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });

    console.log(`📨 Sent to ${to}: ${subject}`);
}
