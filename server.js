import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const formData = req.body;

  const outputDir = path.join(__dirname, 'contact_data');
  const fileName = `contact_${Date.now()}.txt`;
  const filePath = path.join(outputDir, fileName);

  try {
    await fs.promises.mkdir(outputDir, { recursive: true });

    const fileContent = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
Timestamp: ${new Date().toISOString()}
    `.trim();

    await fs.promises.writeFile(filePath, fileContent);

    console.log(`Contact form data saved to ${filePath}`);
    res.status(200).json({ message: 'Message received successfully' });

  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ message: 'Error saving message', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});