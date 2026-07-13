const Appointment = require("../models/Appointment");
const { Resend } = require("resend");

// Initialize Resend client if API key is provided
const resendApiKey = process.env.RESEND_API_KEY;
let resend;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
}
console.log("Env Key : " + process.env.RESEND_API_KEY);
// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res, next) => {
  try {
    const { name, email, phone, date, service, message } = req.body;

    if (!name || !email || !phone || !date || !service || !message) {
      res.status(400);
      throw new Error(
        "Please fill in all details for your appointment booking",
      );
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      service,
      message,
    });

    // Send email notification via Resend API
    if (resend) {
      try {
        const mailFrom = process.env.FROM_EMAIL || "onboarding@resend.dev";
        const mailTo = process.env.CONTACT_RECEIVER_EMAIL;

        if (mailTo) {
          console.log(
            `Dispatching Resend notification email from ${mailFrom} to ${mailTo}...`,
          );
          await resend.emails.send({
            from: mailFrom,
            to: mailTo,
            subject: `🏗️ New Inquiry | ${service} | ${name} | ${Date.now()}`,
            html: `
<div style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

  <div style="max-width:650px;margin:auto;background:#ffffff;border:1px solid #dddddd;border-radius:8px;overflow:hidden;">

    <!-- Header -->
    <div style="background:#b91c1c;padding:24px;text-align:center;">
      <h2 style="margin:0;color:#ffffff;font-size:28px;">
        🏗️ ANB Constructions
      </h2>

      <p style="margin:8px 0 0;color:#ffe4e6;font-size:15px;">
        New Inquiry Received
      </p>
    </div>

    <div style="padding:24px;">

      <p style="font-size:16px;color:#333;">
        A new inquiry has been submitted through your website.
      </p>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;">

      <h3 style="color:#b91c1c;margin-bottom:18px;">
        👤 Customer Details
      </h3>

      <div style="margin-bottom:16px;">
        <strong>Full Name</strong><br>
        <span style="word-break:break-word;">${name}</span>
      </div>

      <div style="margin-bottom:16px;">
        <strong>Email Address</strong><br>
        <span style="word-break:break-all;">
          <a href="mailto:${email}" style="color:#b91c1c;text-decoration:none;">
            ${email}
          </a>
        </span>
      </div>

      <div style="margin-bottom:16px;">
        <strong>Phone Number</strong><br>
        <span>${phone}</span>
      </div>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;">

      <h3 style="color:#b91c1c;margin-bottom:18px;">
        🏗️ Inquiry Details
      </h3>

      <div style="margin-bottom:16px;">
        <strong>Requested Service</strong><br>
        <span>${service}</span>
      </div>

      <div style="margin-bottom:16px;">
        <strong>Preferred Date</strong><br>
        <span>
          ${new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div style="margin-bottom:16px;">
        <strong>Project Requirements</strong><br>
        <div style="margin-top:8px;padding:12px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;white-space:pre-wrap;word-break:break-word;">
          ${message}
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <strong>Submitted On</strong><br>
        <span>${new Date().toLocaleString("en-US")}</span>
      </div>

      <div style="margin-top:30px;padding:16px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:4px;">
        <strong>📞 Action Required</strong><br><br>
        Please contact the customer as soon as possible to discuss the project and schedule a consultation.
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#111827;color:#d1d5db;text-align:center;padding:20px;">
      <strong style="font-size:18px;color:#ffffff;">
        ANB Constructions
      </strong>

      <p style="margin:10px 0 0;font-size:14px;">
        Building Excellence • Quality • Trust
      </p>

      <p style="margin-top:10px;font-size:12px;color:#9ca3af;">
        This is an automated inquiry notification from the ANB Constructions website.
      </p>
    </div>

  </div>

</div>
`,
          });
          console.log("Resend email notification dispatched successfully!");
        } else {
          console.warn(
            "CONTACT_RECEIVER_EMAIL environment variable is not configured. Skipping email dispatch.",
          );
        }
      } catch (err) {
        console.error(
          "Failed to dispatch notification email via Resend:",
          err.message,
        );
      }
    } else {
      console.warn(
        "RESEND_API_KEY is not configured in .env file. Email notification dispatch skipped.",
      );
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public (For demo administration)
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
