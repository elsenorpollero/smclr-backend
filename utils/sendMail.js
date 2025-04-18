const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to any other email service like 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD  // Your email password or app-specific password for Gmail
  }
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  try {
    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

const sendDocument = async (email, pdfBuffer) => {
  try {
     
      // Set up email data
      const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: `${email}`,
          subject: 'Document',
          text: 'Please find the PDF attached.',
          attachments: [
              {
                  filename: 'Document.pdf',
                  content: pdfBuffer,
              },
          ],
      };
      // Send the email with attached PDF
      await transporter.sendMail(mailOptions);
  } catch (err) {
      console.error('Error sending email:', err);
  }
};

module.exports = {sendOtpEmail,sendDocument};
