import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  const { pdfBlob, email, pdfName } = await request.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Recipient email is missing" },
      { status: 400 }
    );
  }

  // Ensure pdfBlob is correctly formatted as a Base64 string
  if (!pdfBlob || typeof pdfBlob !== "string") {
    return NextResponse.json(
      { success: false, message: "Invalid PDF data" },
      { status: 400 }
    );
  }

  const userMailOptions = {
    from: `Resolve <${process.env.EMAIL_ID}>`,
    to: email,
    subject: "Your Customized Acknowledgment PDF - Resolve",
    html: `<p>Dear Applicant,</p>
           <p>Greetings from Resolve!</p>
           <p>Thank you for using Resolve service. We appreciate your time and effort in customizing your document.</p>
           <p>You can download your customized PDF file below - ${pdfName}</p>
           <p>If you need any further assistance, feel free to reach out to us.</p>
           <p>Best Regards,<br>
           <br>
           <span style="margin-top: 2px;">Resolve<span><br>
           <span style="margin-top: 2px;">No. 12, Lakshmi Towers, 4th Floor<br>
           Gandhi Nagar<br>
           Chennai, Tamil Nadu, India - 600102</span><br></p>`,
    attachments: [
      {
        filename: pdfName || "document.pdf",
        content: pdfBlob,
        encoding: "base64",
        contentType: "application/pdf",
      },
    ],
    bcc: ["gokulgandhi2301@gmail.com", "gokulgandhi97@gmail.com"],
  };

  try {
    await transporter.sendMail(userMailOptions);
    console.log("Email sent successfully");
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error sending email" },
      { status: 500 }
    );
  }
}
