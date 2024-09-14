const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
});

exports.sendEventNotification = async (userEmail, event) => {
  try {
    await transporter.sendMail({
      from: 'noreply@eventmanagement.com',
      to: userEmail,
      subject: `You've RSVP'd to ${event.title}`,
      text: `You've successfully RSVP'd to ${event.title} on ${event.date}. We're looking forward to seeing you!`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};