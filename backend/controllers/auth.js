const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModal'); // Import the User model
const {sendOtpEmail,sendDocument} = require('../utils/sendMail')
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require("fs").promises;

const OTP = require('../models/OtpVerification')




// Register a new user
const registerUser = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password,
            phone, 
            fullName, 
            address, 
            position, 
            desiredSalary, 
            USCitizen 
        } = req.body;

        console.log(req.body);

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ status: false, message: 'User already exists' });
        }

        // Password Validation: Check if it meets the criteria
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                status: false,
                message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.' 
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            isAdmin: false,
            isActive: false,
            fullName,
            address,
            position,
            desiredSalary,
            USCitizen
        });

        await user.save();

        // Generate OTP (6-digit random number)
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send OTP to the user's email
        const otpResponse = await sendOtpEmail(email, otp); // Adjust to email sending function
        if (!otpResponse || !otpResponse.success) {
            return res.status(500).json({ status: false, message: 'Failed to send OTP to email' });
        }

        // Store OTP in the database with 10-minute expiration
        const newOtp = new OTP({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60000) // OTP expiration in 10 minutes
        });
        await newOtp.save();

        res.status(201).json({ status: true, message: 'User registered successfully! OTP sent to email.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};



// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Change to email
console.log(req.body);
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({ message: 'User is not active. Please contact support.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { userId: user.userId, isAdmin: user.isAdmin, email: user.email }, // Changed to email
            process.env.JWT_SECRET, // Ensure JWT_SECRET is stored in .env
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token, // Return JWT
            admin:user.isAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

function convertToDateFormat(dateString) {
    // Check if the input is a valid date string
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function fillPdfTemplate(applicantData) {
    try {
      // Load the PDF template
      const pdfBytes = await fs.readFile('template.pdf');
      const pdfDoc = await PDFDocument.load(pdfBytes);
  console.log("All data",applicantData)
      // Access the first page
      const page = pdfDoc.getPages()[0];
  
      // Draw text on the PDF at specific coordinates
      page.drawText(applicantData.name, { x: 115, y: 590, size: 12 });
      page.drawText(convertToDateFormat(applicantData.createdAt), { x: 470, y: 590, size: 12 });
      page.drawText(applicantData.address, { x: 115, y: 553, size: 12 });
      page.drawText(applicantData.phone, { x: 115, y: 477, size: 12 });
      page.drawText(applicantData.email, { x: 327, y: 478, size: 12 });
      page.drawText(applicantData.position, { x: 143, y: 425, size: 12 });
      page.drawText(applicantData.desiredSalary, { x: 474, y: 452, size: 12 });
  
      if(applicantData.USCitizen){
 // Draw a checkbox (example coordinates)
 const checkboxX = 250;
 const checkboxY = 390;

// Draw the first (short) line of the tick mark - going down and right
page.drawLine({
    start: { x: checkboxX + 4, y: checkboxY + 7 },
    end: { x: checkboxX + 6, y: checkboxY + 4 },
    color: rgb(0, 0, 0),
    thickness: 1,
  });
  page.drawLine({
    start: { x: checkboxX + 6, y: checkboxY + 4 },
    end: { x: checkboxX + 10, y: checkboxY + 10 },
    color: rgb(0, 0, 0),
    thickness: 1,
  });
      }
      else{
         // Draw a checkbox (example coordinates)
      const checkboxX2 = 278;
      const checkboxY2 = 390;
      // Draw the first (short) line of the tick mark - going down and right
      page.drawLine({
        start: { x: checkboxX2 + 4, y: checkboxY2 + 7 },
        end: { x: checkboxX2 + 6, y: checkboxY2 + 4 },
        color: rgb(0, 0, 0),
        thickness: 1,
      });
      page.drawLine({
        start: { x: checkboxX2 + 6, y: checkboxY2 + 4 },
        end: { x: checkboxX2 + 10, y: checkboxY2 + 10 },
        color: rgb(0, 0, 0),
        thickness: 1,
      });
      }
     
  
      // Save the filled PDF
      const modifiedPdfBytes = await pdfDoc.save();
      sendDocument(applicantData.email, modifiedPdfBytes);
    } catch (error) {
      throw new Error('Error filling PDF: ' + error.message);
    }
  }


// API to verify OTP
const verifyOtp = async (req, res) => {
    try {
        const { email, enteredOtp } = req.body; // Changed to email
console.log(req.body)
        // Find the OTP entry for the provided email
        const otpEntry = await OTP.findOne({ email });
        const user = await User.findOne({ email }); // Find the user by email
console.log(otpEntry)
        // Check if OTP entry exists and is not expired
        if (!otpEntry) {
            return res.status(400).json({ success: false, message: 'OTP not found or expired' });
        }

        // Verify if the entered OTP matches
        if (otpEntry.otp == enteredOtp) {
            // Mark the OTP as verified
            console.log("I am here")
            otpEntry.isVerified = true;
            await otpEntry.save();

            // Activate the user (if using OTP for user activation)
            if (user) {
                user.isActive = true;
                await user.save();
                 fillPdfTemplate(user);
                
            }

            // Send success response
            return res.status(200).json({ success: true, message: 'OTP verified successfully' });
        } else {
            // If OTP is invalid
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
        return res.status(500).json({ success: false, message: 'Error during OTP verification' });
    }
};

//resend OTP
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body; // Changed to email

        // Validate email format
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Check if a previous OTP entry exists for the email
        const otpEntry = await OTP.findOne({ email });

        let otp;
        if (!otpEntry) {
            // Generate a new OTP if no entry exists
            otp = Math.floor(100000 + Math.random() * 900000); // Generate a new 6-digit OTP

            // Create a new OTP entry
            const newOtpEntry = new OTP({
                email,
                otp,
                isVerified: false,
                createdAt: Date.now()
            });

            await newOtpEntry.save();
        } else {
            // If an OTP entry exists, generate a new OTP and update the existing entry
            otp = Math.floor(100000 + Math.random() * 900000); // Generate a new 6-digit OTP
            otpEntry.otp = otp;
            otpEntry.createdAt = Date.now(); // Reset the creation time
            otpEntry.isVerified = false; // Reset verification status
            await otpEntry.save();
        }

        // Send OTP to the user's email
        const otpResponse = await sendOtpEmail(email, otp); // Updated to send to email

        // Log the OTP for testing (remove in production)
        console.log(`Resent OTP to ${email}: ${otp}`);

        // Send success response
        return res.status(200).json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        return res.status(500).json({ success: false, message: 'Error resending OTP' });
    }
};



module.exports = { registerUser, loginUser,verifyOtp,resendOtp};
