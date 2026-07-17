import express from "express";
import path from "path";
import multer from "multer";
import { Resend } from "resend";
import { createServer as createViteServer } from "vite";

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for submit quote
  app.post("/api/submit-quote", upload.single("billFile"), async (req, res) => {
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
        await resend.emails.send({
          from: 'Quote Requests <quotes@solar.eshtiak.me>',
          to: 'info@logiqon.tech',
          subject: `New Quote Request — ${data.name}`,
          html,
          attachments,
        });
        console.log("Email sent successfully via Resend");
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
