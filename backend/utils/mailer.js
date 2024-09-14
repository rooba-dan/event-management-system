const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure your email service here
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