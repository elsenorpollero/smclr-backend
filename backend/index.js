// Import required modules
const express = require('express');
const cors = require('cors');
const fs = require("fs").promises;
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const { PDFDocument, rgb } = require('pdf-lib');
const nodemailer = require('nodemailer');




// Initialize the app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.post('/data', (req, res) => {
  console.log(req.body); // Access parsed data
  res.json({ message: 'Data received!', data: req.body });
});

const sendEmail = async (pdfBuffer, email) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 't.guptacool1909@gmail.com',
        pass: 'hdquiboomzjchpiz',
      },
    });
    // Set up email data
    const mailOptions = {
      from: 'palkeshpatna@gmail.com',
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

app.get('/', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page1 = pdfDoc.getPages()[1];
    const page2 = pdfDoc.getPages()[2];
    //console.log(page)

    // Sample data to insert
    const applicantData = {
      fullName: "John Doe",
      date: "10/31/2024",
      address: "123 Main St, Anytown, USA",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      ssn: "none",
      position: "Software Engineer",
      ifyes: "none",
      ifyesexplain: "none",
      desiredSalary: "70,000",
      highschool: "Navals",
      eaddress: "transport nagar",
      from: "20/12/2020",
      to: "20/12/2024",
      college: "gbu",
      caddress: "noida",
      cfrom: "20/12/2020",
      cto: "20/12/2023",
      degree: "Btech",
      diploma: "done",
      other: "None",
      otheraddress: "none",
      relationship: "none",
      company: "smclr",
      supervisor: "none",
      jobtitle: "none",
      ss: "none",
      es: "none",
      responsibilities: "none",
      rfl: "none",
      branch: "none",
      rad: "none",
      tod: "none",
      ihe: "none",
      signature: "none"
    };

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.fullName, { x: 120, y: 590, size: 9 });
    page.drawText(applicantData.date, { x: 470, y: 590, size: 9 });
    page.drawText(applicantData.address, { x: 120, y: 553, size: 9 });
    page.drawText(applicantData.phone, { x: 120, y: 477, size: 9 });
    page.drawText(applicantData.email, { x: 330, y: 478, size: 9 });
    page.drawText(applicantData.date, { x: 130, y: 450, size: 9 });
    page.drawText(applicantData.ssn, { x: 250, y: 450, size: 9 });
    page.drawText(applicantData.position, { x: 145, y: 425, size: 9 });
    page.drawText(applicantData.ifyes, { x: 368, y: 363, size: 9 });
    page.drawText(applicantData.ifyesexplain, { x: 123, y: 307, size: 9 });
    page.drawText(applicantData.desiredSalary, { x: 478, y: 450, size: 9 });
    page.drawText(applicantData.highschool, { x: 120, y: 263, size: 9 });
    page.drawText(applicantData.eaddress, { x: 323, y: 263, size: 9 });
    page.drawText(applicantData.from, { x: 95, y: 233, size: 9 });
    page.drawText(applicantData.to, { x: 170, y: 233, size: 9 });
    page.drawText(applicantData.diploma, { x: 420, y: 232, size: 9 });
    page.drawText(applicantData.college, { x: 95, y: 205, size: 9 });
    page.drawText(applicantData.caddress, { x: 320, y: 205, size: 9 });
    page.drawText(applicantData.cfrom, { x: 95, y: 175, size: 9 });
    page.drawText(applicantData.cto, { x: 170, y: 175, size: 9 });
    page.drawText(applicantData.degree, { x: 420, y: 175, size: 9 });
    page.drawText(applicantData.other, { x: 95, y: 150, size: 9 });
    page.drawText(applicantData.otheraddress, { x: 320, y: 150, size: 9 });
    page.drawText(applicantData.cfrom, { x: 95, y: 103, size: 9 });
    page.drawText(applicantData.cto, { x: 170, y: 103, size: 9 });
    page.drawText(applicantData.degree, { x: 430, y: 103, size: 9 });
    page1.drawText(applicantData.fullName, { x: 115, y: 665, size: 9 });
    page1.drawText(applicantData.relationship, { x: 460, y: 665, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 647, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 647, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 629, size: 9 });
    page1.drawText(applicantData.fullName, { x: 115, y: 602, size: 9 });
    page1.drawText(applicantData.relationship, { x: 460, y: 602, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 584, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 584, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 566, size: 9 });
    page1.drawText(applicantData.fullName, { x: 115, y: 540, size: 9 });
    page1.drawText(applicantData.relationship, { x: 460, y: 540, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 522, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 522, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 503, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 458, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 458, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 440, size: 9 });
    page1.drawText(applicantData.supervisor, { x: 460, y: 440, size: 9 });
    page1.drawText(applicantData.jobtitle, { x: 110, y: 414, size: 9 });
    page1.drawText(applicantData.ss, { x: 340, y: 414, size: 9 });
    page1.drawText(applicantData.es, { x: 490, y: 414, size: 9 });
    page1.drawText(applicantData.responsibilities, { x: 130, y: 388, size: 9 });
    page1.drawText(applicantData.from, { x: 115, y: 362, size: 9 });
    page1.drawText(applicantData.to, { x: 210, y: 362, size: 9 });
    page1.drawText(applicantData.rfl, { x: 400, y: 362, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 280, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 280, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 262, size: 9 });
    page1.drawText(applicantData.supervisor, { x: 460, y: 262, size: 9 });
    page1.drawText(applicantData.jobtitle, { x: 115, y: 235, size: 9 });
    page1.drawText(applicantData.ss, { x: 340, y: 235, size: 9 });
    page1.drawText(applicantData.es, { x: 490, y: 235, size: 9 });
    page1.drawText(applicantData.responsibilities, { x: 130, y: 210, size: 9 });
    page1.drawText(applicantData.from, { x: 115, y: 183, size: 9 });
    page1.drawText(applicantData.to, { x: 210, y: 183, size: 9 });
    page1.drawText(applicantData.rfl, { x: 400, y: 183, size: 9 });
    page1.drawText(applicantData.company, { x: 115, y: 101, size: 9 });
    page1.drawText(applicantData.phone, { x: 460, y: 101, size: 9 });
    page1.drawText(applicantData.address, { x: 115, y: 83, size: 9 });
    page1.drawText(applicantData.supervisor, { x: 460, y: 83, size: 9 });
    page1.drawText(applicantData.jobtitle, { x: 115, y: 57, size: 9 });
    page1.drawText(applicantData.ss, { x: 340, y: 57, size: 9 });
    page1.drawText(applicantData.es, { x: 490, y: 57, size: 9 });
    page2.drawText(applicantData.responsibilities, { x: 130, y: 714, size: 9 });
    page2.drawText(applicantData.from, { x: 115, y: 688, size: 9 });
    page2.drawText(applicantData.to, { x: 210, y: 688, size: 9 });
    page2.drawText(applicantData.rfl, { x: 400, y: 688, size: 9 });
    page2.drawText(applicantData.branch, { x: 100, y: 613, size: 9 });
    page2.drawText(applicantData.from, { x: 400, y: 613, size: 9 });
    page2.drawText(applicantData.to, { x: 495, y: 613, size: 9 });
    page2.drawText(applicantData.rad, { x: 145, y: 587, size: 9 });
    page2.drawText(applicantData.tod, { x: 400, y: 587, size: 9 });
    page2.drawText(applicantData.ihe, { x: 205, y: 561, size: 9 });
    page2.drawText(applicantData.signature, { x: 115, y: 439, size: 9 });
    page2.drawText(applicantData.date, { x: 450, y: 439, size: 9 });



    const checkboxX = 244;
    const checkboxY = 392;


    page.drawLine({
      start: { x: checkboxX + 2, y: checkboxY + 5 },
      end: { x: checkboxX + 4, y: checkboxY + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page.drawLine({
      start: { x: checkboxX + 4, y: checkboxY + 2 },
      end: { x: checkboxX + 8, y: checkboxY + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.post('/temp', async (req, res) => {
  try {
    const formData = req.body;  // Data from the request body

    // Load the PDF template
    const pdfBytes = await fs.readFile('template2.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];

    // Fill in the data on the PDF
    page.drawText(formData.payeeName, { x: 365, y: 528, size: 10 });
    page.drawText(formData.payeeAddress, { x: 375, y: 514, size: 10 });
    page.drawText(formData.payeePhone, { x: 407, y: 460, size: 10 });
    page.drawText(formData.payeeSSN, { x: 360, y: 445, size: 10 });
    page.drawText(formData.payeeID, { x: 442, y: 432, size: 10 });
    page.drawText(formData.bankName, { x: 110, y: 362, size: 10 });
    page.drawText(formData.bankAddress, { x: 120, y: 349, size: 10 });
    page.drawText(formData.bankPhone, { x: 155, y: 335, size: 10 });
    page.drawText(formData.routingNumber, { x: 190, y: 322, size: 10 });
    page.drawText(formData.accountNumber, { x: 165, y: 308, size: 10 });
    page.drawText(formData.accountType, { x: 165, y: 293, size: 10 });
    page.drawText(formData.date, { x: 390, y: 130, size: 10 });
    page.drawText(formData.by, { x: 100, y: 130, size: 10 });

    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Send the modified PDF to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_form.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com");
    res.end(modifiedPdfBytes);
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp2', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template3.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    //console.log(page)

    // Sample data to insert
    const applicantData = {
      fullName: "John Doe",
      date: "10/31/2024",
      address: "123 Main St, Anytown, USA",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      position: "Software Engineer",
      desiredSalary: "70,000",
      shirtqty: "45",
      pantqty: "45",
      hatqty: "45",
      glovesqty: "45",
      glassesqty: "45",
      shirtinitials: 'abc',
      pantinitials: 'abc',
      hatinitials: 'abc',
      iphoneinitials: 'abc',
      glovesinitials: 'abc',
      glassesinitials: 'abc',
      monitorinitials: 'abc',
      fordinitials: 'abc',
      macinitials: 'abc',
      other1initials: 'abc',
      other2initials: 'abc',
      hatbrand: 'smclr',
      glovesbrand: 'smclr',
      glassesbrand: 'smclr',
      monitorbrand: 'smclr',
      iphonemodel: '15pro',
      macmodel: 'pro',
      iphoneserial: 'xyz',
      monitorserial: 'xyz',
      fordvin: 'smclr',
      fordplate: 'mno',
      macsn: 'mno',
      other1: 'mno',
      other2: 'mno',
      employeesign: "smclr",
      date1: "12/12/2024",
      print: "smclr",
      companysup: "smclr",
      date2: "12/12/2024"

    };

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.fullName, { x: 110, y: 550, size: 16 });
    // page.drawText(applicantData.date, { x: 470, y: 590 ,size: 16});
    // page.drawText(applicantData.address, { x: 120, y: 553,size: 18 });
    // page.drawText(applicantData.phone, { x: 120, y: 475,size: 16 });
    // page.drawText(applicantData.email, { x: 327, y: 475,size: 16 });
    // page.drawText(applicantData.position, { x: 143, y: 425,size:16 });
    page.drawText(applicantData.shirtqty, { x: 250, y: 398, size: 12 });
    page.drawText(applicantData.shirtinitials, { x: 330, y: 398, size: 12 });

    page.drawText(applicantData.pantqty, { x: 280, y: 380, size: 12 });
    page.drawText(applicantData.pantinitials, { x: 360, y: 380, size: 12 });

    page.drawText(applicantData.hatbrand, { x: 200, y: 363, size: 12 });
    page.drawText(applicantData.hatqty, { x: 280, y: 363, size: 12 });
    page.drawText(applicantData.hatinitials, { x: 360, y: 363, size: 12 });

    page.drawText(applicantData.iphonemodel, { x: 210, y: 345, size: 12 });
    page.drawText(applicantData.iphoneserial, { x: 285, y: 345, size: 12 });
    page.drawText(applicantData.iphoneinitials, { x: 405, y: 345, size: 12 });

    page.drawText(applicantData.glovesbrand, { x: 225, y: 328, size: 12 });
    page.drawText(applicantData.glovesqty, { x: 320, y: 328, size: 12 });
    page.drawText(applicantData.glovesinitials, { x: 400, y: 328, size: 12 });

    page.drawText(applicantData.glassesbrand, { x: 225, y: 310, size: 12 });
    page.drawText(applicantData.glassesqty, { x: 320, y: 310, size: 12 });
    page.drawText(applicantData.glassesinitials, { x: 400, y: 310, size: 12 });

    page.drawText(applicantData.monitorbrand, { x: 215, y: 292, size: 12 });
    page.drawText(applicantData.monitorserial, { x: 305, y: 292, size: 12 });
    page.drawText(applicantData.monitorinitials, { x: 410, y: 292, size: 12 });

    page.drawText(applicantData.fordvin, { x: 180, y: 275, size: 12 });
    page.drawText(applicantData.fordplate, { x: 320, y: 275, size: 12 });
    page.drawText(applicantData.fordinitials, { x: 415, y: 275, size: 12 });

    page.drawText(applicantData.macmodel, { x: 240, y: 257, size: 12 });
    page.drawText(applicantData.macsn, { x: 285, y: 257, size: 12 });
    page.drawText(applicantData.macinitials, { x: 400, y: 257, size: 12 });

    page.drawText(applicantData.other1, { x: 140, y: 240, size: 12 });
    page.drawText(applicantData.other1initials, { x: 380, y: 240, size: 12 });

    page.drawText(applicantData.other2, { x: 140, y: 223, size: 12 });
    page.drawText(applicantData.other2initials, { x: 380, y: 223, size: 12 });

    page.drawText(applicantData.employeesign, { x: 200, y: 164, size: 12 });
    page.drawText(applicantData.date1, { x: 390, y: 164, size: 12 });

    page.drawText(applicantData.print, { x: 100, y: 135, size: 12 });

    page.drawText(applicantData.companysup, { x: 190, y: 105, size: 12 });
    page.drawText(applicantData.date2, { x: 378, y: 105, size: 12 });




    const checkboxX = 240;
    const checkboxY = 390;



    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp3', async (req, res) => {
  try {
    const { PDFDocument, rgb } = require('pdf-lib'); // Ensure pdf-lib is imported
    const fs = require('fs').promises; // For file handling

    // Load the PDF template
    const pdfBytes = await fs.readFile('template4.pdf'); // Replace with correct path
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];

    // Sample data to insert
    const formData = {
      blank1: "10/31/2024",
      blank2: "John Doe",
      blank3: "SN123456789",
      blank4: "10/31/2024",
      blank5: "xyzz",
      blank6: "SN123456789",
      blank7: "10/31/2024",
      blank8: "xyzz"
    };

    // Insert data into the PDF at specific coordinates
    page.drawText(formData.blank1, { x: 430, y: 633, size: 12 });
    page.drawText(formData.blank2, { x: 90, y: 620, size: 12 });
    page.drawText(formData.blank3, { x: 280, y: 620, size: 12 });
    page.drawText(formData.blank4, { x: 90, y: 595, size: 12 });
    page.drawText(formData.blank5, { x: 265, y: 431, size: 12 });
    page.drawText(formData.blank6, { x: 220, y: 90, size: 12 });
    page.drawText(formData.blank7, { x: 220, y: 65, size: 12 });
    page.drawText(formData.blank8, { x: 220, y: 40, size: 12 });

    // Save the updated PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Send the modified PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_template.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com");
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp4', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template5.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page1 = pdfDoc.getPages()[2];
    const page2 = pdfDoc.getPages()[3];
    const page3 = pdfDoc.getPages()[4];
    //console.log(page)

    // Sample data to insert
    const applicantData = {
      fullName: "John Doe",
      date: "10/31/2024",
      address: "123 Main St, Anytown, USA",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      position: "Software Engineer",
      desiredSalary: "70,000",
      highschool: "Navals",
      eaddress: "transport nagar",
      from: "20/12/2020",
      to: "20/12/2024",
      college: "gbu",
      caddress: "noida",
      cfrom: "20/12/2020",
      cto: "20/12/2023",
      degree: "Btech",
      date1: "12/12/2024"
    };

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.fullName, { x: 100, y: 587, size: 12 });
    page.drawText(applicantData.date, { x: 70, y: 350, size: 12 });
    page.drawText(applicantData.address, { x: 70, y: 292, size: 12 });
    page.drawText(applicantData.phone, { x: 70, y: 233, size: 12 });
    page.drawText(applicantData.email, { x: 70, y: 174, size: 12 });
    page.drawText(applicantData.position, { x: 70, y: 116, size: 12 });
    page1.drawText(applicantData.desiredSalary, { x: 70, y: 395, size: 12 });
    page1.drawText(applicantData.highschool, { x: 70, y: 327, size: 12 });
    page1.drawText(applicantData.eaddress, { x: 70, y: 259, size: 12 });
    page1.drawText(applicantData.from, { x: 70, y: 190, size: 12 });
    page2.drawText(applicantData.to, { x: 200, y: 430, size: 12 });
    page2.drawText(applicantData.college, { x: 70, y: 328, size: 12 });
    page2.drawText(applicantData.caddress, { x: 70, y: 277, size: 12 });
    page2.drawText(applicantData.cfrom, { x: 70, y: 225, size: 12 });
    page2.drawText(applicantData.cto, { x: 70, y: 174, size: 12 });
    page2.drawText(applicantData.degree, { x: 70, y: 123, size: 12 });
    page3.drawText(applicantData.date1, { x: 70, y: 707, size: 12 });

    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp5', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template6.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page2 = pdfDoc.getPages()[2];

    //console.log(page)

    // Sample data to insert
    const applicantData = {
      fullName: "John Doe",
      date: "10/31/2024",
      address: "Anytown, USA",
      phone: "123-456-7890",
      email: "@example.com",
      position: "Software Engineer",
      desiredSalary: "70,000",
      highschool: "Navals",

    };

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.fullName, { x: 380, y: 571, size: 9 });
    page.drawText(applicantData.date, { x: 160, y: 560, size: 9 });
    page.drawText(applicantData.address, { x: 235, y: 560, size: 9 });
    page.drawText(applicantData.phone, { x: 330, y: 560, size: 9 });
    page2.drawText(applicantData.email, { x: 345, y: 549, size: 9 });
    page2.drawText(applicantData.position, { x: 235, y: 435, size: 9 });
    page2.drawText(applicantData.desiredSalary, { x: 105, y: 318, size: 9 });
    page2.drawText(applicantData.highschool, { x: 250, y: 318, size: 9 });


    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp6', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template7.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page1 = pdfDoc.getPages()[1];

    //console.log(page)

    // Sample data to insert
    const applicantData = {
      firstName: "John Doe",
      middlename: "none",
      lastname: "Doe",
      certificateno: "123456",
      dob: "12/12/2024",
      idcco: "123456",
      address: "Anytown, USA",
      city: "chicago",
      state: "none",
      zipcode: "333333",
      phone: "123-456-7890",
      email: "@example.com",
      size: "xl",
      company: "smclr",
      reference: "none",
      signature: "smclr",
      amount: "400",
      cc: "78787878787878",
      sc: "87878"

    };

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.firstName, { x: 180, y: 620, size: 9 });
    page.drawText(applicantData.middlename, { x: 305, y: 620, size: 9 });
    page.drawText(applicantData.lastname, { x: 435, y: 620, size: 9 });
    page.drawText(applicantData.certificateno, { x: 75, y: 575, size: 9 });
    page.drawText(applicantData.dob, { x: 250, y: 575, size: 9 });
    page.drawText(applicantData.idcco, { x: 350, y: 575, size: 9 });
    page.drawText(applicantData.address, { x: 75, y: 545, size: 9 });
    page.drawText(applicantData.city, { x: 310, y: 545, size: 9 });
    page.drawText(applicantData.state, { x: 440, y: 545, size: 9 });
    page.drawText(applicantData.zipcode, { x: 505, y: 545, size: 9 });
    page.drawText(applicantData.phone, { x: 75, y: 513, size: 9 });
    page.drawText(applicantData.phone, { x: 205, y: 513, size: 9 });
    page.drawText(applicantData.email, { x: 350, y: 513, size: 9 });
    page.drawText(applicantData.dob, { x: 75, y: 482, size: 9 });
    page.drawText(applicantData.size, { x: 410, y: 482, size: 9 });
    page.drawText(applicantData.company, { x: 75, y: 456, size: 9 });
    page.drawText(applicantData.phone, { x: 270, y: 456, size: 9 });
    page.drawText(applicantData.reference, { x: 360, y: 456, size: 9 });
    page1.drawText(applicantData.signature, { x: 80, y: 550, size: 9 });
    page1.drawText(applicantData.dob, { x: 420, y: 550, size: 9 });
    page1.drawText(applicantData.amount, { x: 290, y: 336, size: 9 });
    page1.drawText(applicantData.cc, { x: 170, y: 308, size: 9 });
    page1.drawText(applicantData.dob, { x: 470, y: 308, size: 9 });
    page1.drawText(applicantData.sc, { x: 470, y: 280, size: 9 });
    page1.drawText(applicantData.firstName, { x: 210, y: 252, size: 9 });
    page1.drawText(applicantData.signature, { x: 405, y: 252, size: 9 });



    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp7', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template8.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page1 = pdfDoc.getPages()[1];

    // Sample data to insert
    const formData = {
      firstname: "John",
      lastname: "Doe",
      dobdate: "12",
      dobmonth: "12",
      dobyear: "24",
      sn1: "123",
      sn2: "456",
      sn3: "789",
      email: "@example.com",
      stdcode: "+91",
      phone: "7878787878",
      street: "123 Main St, Anytown, USA",
      apartment: "46",
      city: "Newyork",
      state: "None",
      zipcode: "111111",
      spousefirstname: "None",
      spouselastname: "None",
      dependentFName : "None",
       dependentLname : "None",
       dependentDOD : "05",
       dependentDOM : "08" ,
       dependentDOY : "2000" ,
       dependentSSNfist : "1234",
       dependentSSNsec : "456",
       dependentSSNthird :"7890",
       dependentAddress : "123 Main St, Anytown, USA",

       dependentFName2 : "None",
       dependentLname2 : "None",
       dependentDOD2 : "05",
       dependentDOM2 : "08" ,
       dependentDOY2 : "2000" ,
       dependentSSNfist2 : "1234",
       dependentSSNsec2 : "456",
       dependentSSNthird2 :"7890",
       dependentAddress2 : "123 Main St, Anytown, USA",

       dependentFName3 : "None",
       dependentLname3 : "None",
       dependentDOD3 : "05",
       dependentDOM3 : "08" ,
       dependentDOY3 : "3000" ,
       dependentSSNfist3 : "1334",
       dependentSSNsec3 : "456",
       dependentSSNthird3 :"7890",
       dependentAddress3 : "123 Main St, Anytown, USA",

       sign : "ramsdjfsdj",
       dateofpass : "12/12/2012",

    };

    // Fill in the data
    page.drawText(formData.firstname, { x: 30, y: 685, size: 10 });
    page.drawText(formData.lastname, { x: 180, y: 685, size: 10 });
    page.drawText(formData.dobdate, { x: 340, y: 685, size: 10 });
    page.drawText(formData.dobmonth, { x: 375, y: 685, size: 10 });
    page.drawText(formData.dobyear, { x: 405, y: 685, size: 10 });
    page.drawText(formData.sn1, { x: 475, y: 685, size: 10 });
    page.drawText(formData.sn2, { x: 518, y: 685, size: 10 });
    page.drawText(formData.sn3, { x: 550, y: 685, size: 10 });
    page.drawText(formData.email, { x: 90, y: 645, size: 10 });
    page.drawText(formData.stdcode, { x: 330, y: 645, size: 10 });
    page.drawText(formData.phone, { x: 370, y: 645, size: 10 });
    page.drawText(formData.dobdate, { x: 475, y: 645, size: 10 });
    page.drawText(formData.dobmonth, { x: 513, y: 645, size: 10 });
    page.drawText(formData.dobyear, { x: 545, y: 645, size: 10 });
    page.drawText(formData.street, { x: 30, y: 580, size: 10 });
    page.drawText(formData.apartment, { x: 475, y: 580, size: 10 });
    page.drawText(formData.city, { x: 30, y: 542, size: 10 });
    page.drawText(formData.state, { x: 340, y: 542, size: 10 });
    page.drawText(formData.zipcode, { x: 475, y: 542, size: 10 });
    page1.drawText(formData.spousefirstname, { x: 30, y: 680, size: 10 });
    page1.drawText(formData.spouselastname, { x: 260, y: 680, size: 10 });
    page1.drawText(formData.dobdate, { x: 30, y: 637, size: 10 });
    page1.drawText(formData.dobmonth, { x: 60, y: 637, size: 10 });
    page1.drawText(formData.dobyear, { x: 100, y: 637, size: 10 });
    page1.drawText(formData.sn1, { x: 165, y: 637, size: 10 });
    page1.drawText(formData.sn2, { x: 203, y: 637, size: 10 });
    page1.drawText(formData.sn3, { x: 234, y: 637, size: 10 });
    page1.drawText(formData.street, { x: 30, y: 595, size: 10 });
    page1.drawText(formData.dependentFName, { x: 30, y: 520, size: 10 });
     page1.drawText(formData.dependentLname, { x: 270, y: 520, size: 10 });
     page1.drawText(formData.dependentDOD, { x: 35, y: 480, size: 10 });
     page1.drawText(formData.dependentDOM, { x: 64, y: 480, size: 10 });
     page1.drawText(formData.dependentDOY, { x: 92, y: 480, size: 10 });
     page1.drawText(formData.dependentSSNfist, { x: 166, y: 480, size: 10 });
     page1.drawText(formData.dependentSSNsec, { x: 204, y: 480, size: 10 });
     page1.drawText(formData.dependentSSNthird, { x: 235, y: 480, size: 10 });
     page1.drawText(formData.dependentAddress, { x: 40, y: 438, size: 10 });

     page1.drawText(formData.dependentFName2, { x: 30, y: 365, size: 10 });
     page1.drawText(formData.dependentLname2, { x: 270, y: 365, size: 10 });
     page1.drawText(formData.dependentDOD2, { x: 35, y: 325, size: 10 });
     page1.drawText(formData.dependentDOM2, { x: 64, y: 325, size: 10 });
     page1.drawText(formData.dependentDOY2, { x: 92, y: 325, size: 10 });
     page1.drawText(formData.dependentSSNfist2, { x: 166, y: 325, size: 10 });
     page1.drawText(formData.dependentSSNsec2, { x: 204, y: 325, size: 10 });
     page1.drawText(formData.dependentSSNthird2, { x: 235, y: 325, size: 10 });
     page1.drawText(formData.dependentAddress2, { x: 40, y: 277, size: 10 });

     page1.drawText(formData.dependentFName3, { x: 30, y: 208, size: 10 });
     page1.drawText(formData.dependentLname3, { x: 270, y: 208, size: 10 });
     page1.drawText(formData.dependentDOD3, { x: 35, y: 165, size: 10 });
     page1.drawText(formData.dependentDOM3, { x: 64, y: 165, size: 10 });
     page1.drawText(formData.dependentDOY3, { x: 92, y: 165, size: 10 });
     page1.drawText(formData.dependentSSNfist3, { x: 166, y: 165, size: 10 });
     page1.drawText(formData.dependentSSNsec3, { x: 204, y: 165, size: 10 });
     page1.drawText(formData.dependentSSNthird3, { x: 235, y: 165, size: 10 });
     page1.drawText(formData.dependentAddress3, { x: 40, y: 125, size: 10 });

     page1.drawText(formData.sign, { x: 150, y: 28, size: 10 });
     page1.drawText(formData.dateofpass, { x: 510, y: 28, size: 10 });



    const checkboxX = 20;
    const checkboxY = 645;

    const checkboxa = 40;
    const checkboxb = 645;

    const checkboxe = 302;
    const checkboxf = 637;

    const checkboxg = 320;
    const checkboxh = 637;

    const checkboxi = 302;
    const checkboxj = 480;

    const checkboxk = 320;
    const checkboxl = 480;

    const checkboxm = 302;
    const checkboxn = 323;

    const checkboxo = 320;
    const checkboxp = 323;

    const checkboxq = 302;
    const checkboxr = 165;

    const checkboxs = 320;
    const checkboxt = 165;




    page.drawLine({
      start: { x: checkboxX + 2, y: checkboxY + 5 },
      end: { x: checkboxX + 4, y: checkboxY + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page.drawLine({
      start: { x: checkboxX + 4, y: checkboxY + 2 },
      end: { x: checkboxX + 8, y: checkboxY + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page.drawLine({
      start: { x: checkboxa + 2, y: checkboxb + 5 },
      end: { x: checkboxa + 4, y: checkboxb + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page.drawLine({
      start: { x: checkboxa + 4, y: checkboxb + 2 },
      end: { x: checkboxa + 8, y: checkboxb + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxe + 2, y: checkboxf + 5 },
      end: { x: checkboxe + 4, y: checkboxf + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxe + 4, y: checkboxf + 2 },
      end: { x: checkboxe + 8, y: checkboxf + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxg + 2, y: checkboxh + 5 },
      end: { x: checkboxg + 4, y: checkboxh + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxg + 4, y: checkboxh + 2 },
      end: { x: checkboxg + 8, y: checkboxh + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxi + 2, y: checkboxj + 5 },
      end: { x: checkboxi + 4, y: checkboxj + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxi + 4, y: checkboxj + 2 },
      end: { x: checkboxi + 8, y: checkboxj + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxk + 2, y: checkboxl + 5 },
      end: { x: checkboxk + 4, y: checkboxl + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxk + 4, y: checkboxl + 2 },
      end: { x: checkboxk + 8, y: checkboxl + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxm + 2, y: checkboxn + 5 },
      end: { x: checkboxm + 4, y: checkboxn + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxm + 4, y: checkboxn + 2 },
      end: { x: checkboxm + 8, y: checkboxn + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxo + 2, y: checkboxp + 5 },
      end: { x: checkboxo + 4, y: checkboxp + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxo + 4, y: checkboxp + 2 },
      end: { x: checkboxo + 8, y: checkboxp + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxq + 2, y: checkboxr + 5 },
      end: { x: checkboxq + 4, y: checkboxr + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxq + 4, y: checkboxr + 2 },
      end: { x: checkboxq + 8, y: checkboxr + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    page1.drawLine({
      start: { x: checkboxs + 2, y: checkboxt + 5 },
      end: { x: checkboxs + 4, y: checkboxt + 2 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });
    page1.drawLine({
      start: { x: checkboxs + 4, y: checkboxt + 2 },
      end: { x: checkboxs + 8, y: checkboxt + 8 },
      color: rgb(0, 0, 0),
      thickness: 1,
    });

    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Send the modified PDF to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_form.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com");
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp8', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template9.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page2 = pdfDoc.getPages()[2];
    //console.log(page)

    // Sample data to insert
    const applicantData = {
      firstName: "John Doe",
      lastName: "Doe",
      securityNumber: "82013",
      address: "123 Main St, Anytown, USA",
      fullAddress: "123 Main St, Anytown, USA",
      amountClaim: "1500",
      amountClaim1: "1500",
      amountClaimTotal: "1500",
      amountClaimTotal2: "4500",
      amountAdj1: "1000",
      amountAdj2: "1200",
      amountAdj3: "1400",
      signemployee: "johndoe@example.com",
      employeeNameaddress: "Adam from CANADA",
      date: "10/10/2024",
      checkboxes: [
        { x: 128, y: 608, isChecked: true }, // Checkbox 1
        { x: 128, y: 597, isChecked: false }, // Checkbox 2
        { x: 128, y: 586, isChecked: false }, // Checkbox 3
      ],
      emp1stdate: "10/10/2024",
      empEN: "10/10/2024",
    };

    //page 3 
    const page3data = {
      amount01: "200",
      amount02: "400",
      amount03: "600",
      amount04: "800",
      amount05: "1000",
      amount06: "1200",
      amount07: "1400",
      amount08: "1800",
      amount09: "2000",
      amount10: "2200",
      amount11: "2400",
      amount12: "2600",

    }
    //page 3

    page2.drawText(page3data.amount01, { x: 499, y: 600, size: 10 });
    page2.drawText(page3data.amount02, { x: 499, y: 516, size: 10 });
    page2.drawText(page3data.amount03, { x: 499, y: 463, size: 10 });
    page2.drawText(page3data.amount04, { x: 499, y: 441, size: 10 });
    page2.drawText(page3data.amount05, { x: 499, y: 407, size: 10 });
    page2.drawText(page3data.amount06, { x: 499, y: 363, size: 10 });
    page2.drawText(page3data.amount07, { x: 499, y: 302, size: 10 });
    page2.drawText(page3data.amount08, { x: 499, y: 270, size: 10 });
    page2.drawText(page3data.amount09, { x: 499, y: 228, size: 10 });
    page2.drawText(page3data.amount10, { x: 499, y: 191, size: 10 });
    page2.drawText(page3data.amount11, { x: 499, y: 170, size: 10 });

    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.firstName, { x: 130, y: 665, size: 10 });
    page.drawText(applicantData.lastName, { x: 290, y: 665, size: 10 });
    page.drawText(applicantData.securityNumber, { x: 500, y: 665, size: 10 });
    page.drawText(applicantData.address, { x: 138, y: 644, size: 10 });
    page.drawText(applicantData.fullAddress, { x: 138, y: 620, size: 10 });
    page.drawText(applicantData.amountClaim, { x: 410, y: 381, size: 10 });
    page.drawText(applicantData.amountClaim1, { x: 410, y: 364, size: 10 });
    page.drawText(applicantData.amountClaimTotal, { x: 410, y: 348, size: 10 });
    page.drawText(applicantData.amountClaimTotal2, { x: 497, y: 350, size: 10 });
    page.drawText(applicantData.amountAdj1, { x: 497, y: 315, size: 10 });
    page.drawText(applicantData.amountAdj2, { x: 497, y: 275, size: 10 });
    page.drawText(applicantData.amountAdj3, { x: 497, y: 254, size: 10 });
    page.drawText(applicantData.signemployee, { x: 180, y: 194, size: 10 });
    page.drawText(applicantData.date, { x: 480, y: 194, size: 10 });
    page.drawText(applicantData.employeeNameaddress, { x: 138, y: 140, size: 10 });
    page.drawText(applicantData.employeeNameaddress, { x: 138, y: 140, size: 10 });
    page.drawText(applicantData.employeeNameaddress, { x: 138, y: 140, size: 10 });
    page.drawText(applicantData.emp1stdate, { x: 390, y: 140, size: 10 });
    page.drawText(applicantData.empEN, { x: 475, y: 140, size: 10 });
    // Draw checkboxes
    const drawCheckbox = (page, checkbox) => {
      if (checkbox.isChecked) {
        // Draw the checkmark (tick)
        page.drawLine({
          start: { x: checkbox.x + 2, y: checkbox.y + 5 },
          end: { x: checkbox.x + 4, y: checkbox.y + 2 },
          color: rgb(0, 0, 0),
          thickness: 1,
        });
        page.drawLine({
          start: { x: checkbox.x + 4, y: checkbox.y + 2 },
          end: { x: checkbox.x + 8, y: checkbox.y + 8 },
          color: rgb(0, 0, 0),
          thickness: 1,
        });
      }
    };

    applicantData.checkboxes.forEach((checkbox) => drawCheckbox(page, checkbox));

    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

app.get('/temp9', async (req, res) => {
  try {
    // Load the PDF template
    const pdfBytes = await fs.readFile('template10.pdf');
    //console.log(pdfBytes);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Access the first page
    const page = pdfDoc.getPages()[0];
    const page2 = pdfDoc.getPages()[1];
    //console.log(page)

    // Sample data to insert
    const applicantData = {
      firstName: "John Doe",
      // lastName: "Doe",
      address: "123 Main St, Anytown, USA",
      securityNumber: "82013",
      fullAddress: "123 Main St, Anytown, USA",
      mobileNumber: "8988552211",
      phoneNumber: "+1500-213",
      faxId: "1500",
      checkboxes: [
        { x: 40, y: 483, isChecked: true }, // Checkbox 1
        { x: 316, y: 483, isChecked: true }, // Checkbox 1
        { x: 40, y: 445, isChecked: true }, // Checkbox 2
        { x: 316, y: 445, isChecked: true }, // Checkbox 2
        { x: 40, y: 395, isChecked: true }, // Checkbox 3
        { x: 313, y: 382, isChecked: true }, // Checkbox 3
        { x: 40, y: 331, isChecked: true }, // Checkbox 3
        { x: 330, y: 293, isChecked: true }, // Checkbox 3
        { x: 40, y: 243, isChecked: true }, // Checkbox 3
      ],
      pay1: "100",
      pay2: "200",
      pay3: "300",
      pay4: "400",
      pay5: "500",
      pay6: "600",
      pay7: "700",
      pay8: "80",
      pay9: "900",
    };

    //page 3 
    const page3data = {
      amount01: "Jone",
      amount02: "David",
      amount03: "Victor",
      amount04: "Jonny",
      amount05: "Rambo",
      amount06: "Sunny",
      amount07: "Tom",
      amount08: "Browo",
      amount09: "20/12/2023",

    }


    // Draw text on the PDF at specific coordinates
    page.drawText(applicantData.firstName, { x: 160, y: 549, size: 10 });
    page.drawText(applicantData.securityNumber, { x: 502, y: 549, size: 10 });
    page.drawText(applicantData.address, { x: 160, y: 534, size: 10 });
    page.drawText(applicantData.mobileNumber, { x: 120, y: 520, size: 10 });
    page.drawText(applicantData.phoneNumber, { x: 290, y: 520, size: 10 });
    page.drawText(applicantData.faxId, { x: 430, y: 520, size: 10 });
    page.drawText(applicantData.pay1, { x: 90, y: 483, size: 10 });
    page.drawText(applicantData.pay2, { x: 360, y: 484, size: 10 });
    page.drawText(applicantData.pay3, { x: 90, y: 445, size: 10 });
    page.drawText(applicantData.pay4, { x: 362, y: 445, size: 10 });
    page.drawText(applicantData.pay5, { x: 90, y: 395, size: 10 });
    page.drawText(applicantData.pay6, { x: 362, y: 382, size: 10 });
    page.drawText(applicantData.pay7, { x: 90, y: 331, size: 10 });
    page.drawText(applicantData.pay8, { x: 375, y: 294, size: 10 });
    page.drawText(applicantData.pay9, { x: 90, y: 243, size: 10 });
    // Draw checkboxes

    const drawCheckbox = (page, checkbox) => {
      if (checkbox.isChecked) {
        // Draw the checkmark (tick)
        page.drawLine({
          start: { x: checkbox.x + 2, y: checkbox.y + 5 },
          end: { x: checkbox.x + 4, y: checkbox.y + 2 },
          color: rgb(0, 0, 0),
          thickness: 1,
        });
        page.drawLine({
          start: { x: checkbox.x + 4, y: checkbox.y + 2 },
          end: { x: checkbox.x + 8, y: checkbox.y + 8 },
          color: rgb(0, 0, 0),
          thickness: 1,
        });
      }
    };


    applicantData.checkboxes.forEach((checkbox) => drawCheckbox(page, checkbox));


    //page 2

    page2.drawText(page3data.amount01, { x: 356, y: 604, size: 10 });
    page2.drawText(page3data.amount02, { x: 430, y: 604, size: 10 });
    page2.drawText(page3data.amount03, { x: 356, y: 588, size: 10 });
    page2.drawText(page3data.amount04, { x: 430, y: 588, size: 10 });
    page2.drawText(page3data.amount05, { x: 395, y: 440, size: 10 });
    page2.drawText(page3data.amount06, { x: 380, y: 380, size: 10 });
    page2.drawText(page3data.amount07, { x: 355, y: 244, size: 10 });
    page2.drawText(page3data.amount08, { x: 155, y: 84, size: 10 });
    page2.drawText(page3data.amount09, { x: 350, y: 84, size: 10 });


    // Save the filled PDF
    const modifiedPdfBytes = await pdfDoc.save();
    //console.log(modifiedPdfBytes)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="filled_application.pdf"');
    sendEmail(modifiedPdfBytes, "hariomshukla6414@gmail.com")
  } catch (error) {
    res.status(500).send('Error filling PDF: ' + error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
