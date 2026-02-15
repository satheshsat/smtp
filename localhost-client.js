const nodemailer = require('nodemailer');

async function sendTestEmail() {
  let transporter = nodemailer.createTransport({
    //host: "mail.kssvnr.com",
	host: 'localhost',
    port: 2525,
    secure: false, // Use 'true' if your local SMTP server uses TLS/SSL
     auth: { // Uncomment and configure if your local server requires authentication
       user: 'test',
       pass: 'test',
     },
    tls: {
      rejectUnauthorized: false // Only for testing with self-signed certs or local servers
    }
  });

  let info = await transporter.sendMail({
    from: '"Sender Name" <sender@kssvnr.com>',
    to: "satheshs.sat@gmail.com",
    subject: "Test Email from Nodemailer",
    text: "Hello from your local SMTP server!",
    html: "<b>Hello from your local SMTP server!</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

sendTestEmail().catch(console.error);