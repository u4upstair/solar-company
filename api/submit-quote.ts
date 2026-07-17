import express from 'express';
import multer from 'multer';
import { Resend } from 'resend';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post('/api/submit-quote', upload.single('billFile'), async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    console.log("Received Quote Request:", data);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const attachments = [];
    if (file) {
      attachments.push({ filename: file.originalname, content: file.buffer });
    }

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>How they heard about us:</strong> ${data.hearAboutUs || 'Not provided'}</p>
      <hr/>
      <p><strong>Property Type:</strong> ${data.propertyType}</p>
      ${data.homeSubtype ? `<p><strong>Home Type:</strong> ${data.homeSubtype} &mdash; Owns property: ${data.ownsHome}</p>` : ''}
      ${data.commercialSubtype ? `<p><strong>Commercial Type:</strong> ${data.commercialSubtype} &mdash; ~${data.commercialSqft} sqft</p>` : ''}
      ${data.businessSubtype ? `<p><strong>Business Type:</strong> ${data.businessSubtype} &mdash; ~${data.businessSqft} sqft</p>` : ''}
      <hr/>
      <p><strong>Address:</strong> ${data.street}, ${data.city}, ${data.state} ${data.zip}</p>
      ${file ? '<p>Electricity bill attached.</p>' : '<p>No bill uploaded.</p>'}
    `;

    if (process.env.RESEND_API_KEY) {
      const { data: resendData, error: resendError } = await resend.emails.send({
        from: 'Quote Requests <quotes@solar.eshtiak.me>',
        to: ['info@logiqon.tech', 'u4upstair@gmail.com'],
        subject: `New Quote Request — ${data.name}`,
        html,
        attachments,
      });

      console.log("Resend response:", resendData);
      console.log("Resend error:", resendError);

      if (resendError) {
        console.error("Resend API Error:", resendError);
        throw new Error(JSON.stringify(resendError));
      }

      console.log("Email sent successfully");
    } else {
      console.log("No RESEND_API_KEY configured. Skipping actual email send. Email content:");
      console.log(html);
      console.log("Attachments:", attachments.map(a => a.filename));
    }

    res.status(200).json({ success: true, message: "Quote request submitted successfully." });
  } catch (error) {
    console.error("Error submitting quote:", error);
    res.status(500).json({ success: false, message: "Failed to submit quote request." });
  }
});

export default app;
