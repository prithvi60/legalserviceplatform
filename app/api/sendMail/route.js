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

export async function POST(req) {
  const {
    firstName,
    lastName,
    userEmail,
    phone,
    clientEmail,
    subject,
    message,
    type,
  } = await req.json();

  // !userEmail || !clientEmail
  if (!userEmail || !clientEmail) {
    return NextResponse.json(
      { success: false, message: "Recipient email(s) missing" },
      { status: 400 }
    );
  }

  // Existing email options for other types of submissions
  const userMailOptions = {
    from: `legal services - "${clientEmail}" <${"support@webibee.com"}>`,
    to: userEmail,
    subject: "Acknowledgment: We received your Enquiry",
    html: `<p>Dear Applicant,</p>
           <p>Greetings from Legal Services!</p>
           <p>We have received your enquiry, our team will revert back shorty.</p>
                    <p>Thanks & Regards,<br>
                    <br>
           <span style="margin-top: 2px;">legal services Intellectual Property Attorneys<span><br>
           <span style="margin-top: 2px;">  Swarna Shree complex, 3rd Floor.<br>
           No. 36, Veerappan street, Sowcarpet,<br>
           Chennai, Tamil Nadu, India - 600 079</span><br></p>
        `,
  };

  // Email options for the client (all user data and attachments)
  const clientMailOptions = {
    from: `"${userEmail}" <${"support@webibee.com"}>`,
    to: clientEmail,
    subject: subject,
    html: `
            <div className="block space-y-10 font-merriWeather">
            <h4 className="!text-lg !capitalize">Hi,</h4>
            <p>You have a new form submission for ${type}</p>
            <p className="!flex !items-center !justify-center !gap-3">
            <span className="!capitalize !font-bold">Name:</span> 
            ${firstName} ${lastName}
            </p>
            <p>Email: ${userEmail}</p>
            <p>Phone Number: ${phone}</p>
            <p>Query: ${message}</p>
            <br/>
            <br/>
            <p>Thanks</p>
            </div> 
            `,

    bcc: [""],
  };

  try {
    // Send acknowledgment email to the customer
    await transporter.sendMail(userMailOptions);
    // console.log("Acknowledgment email sent to user.");

    // Send detailed email to the legal service
    await transporter.sendMail(clientMailOptions);
    // console.log("Email with user data and attachments sent to client.");

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error sending emails" },
      { status: 500 }
    );
  }
}
