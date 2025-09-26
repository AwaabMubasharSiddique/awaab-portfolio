import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json().catch(() => ({}));

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  console.log("Environment check:", {
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPass: !!process.env.GMAIL_APP_PASSWORD
  });

  // Check if email is configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("Email not configured - saving to console instead");
    console.log("Contact submission:", { name, email, message });
    return NextResponse.json({ message: "Thanks! I'll get back to you soon." });
  }

  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "gr9awaab@gmail.com",
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log("Attempting to send email...");
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({ message: "Thanks! I'll get back to you soon." });
  } catch (error) {
    console.error("Email send error:", error);
    console.error("Full error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}