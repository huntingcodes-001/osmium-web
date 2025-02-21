import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/analytics', (req, res) => {
  const analyticsData = req.body;

  // 1. User Info (on initial visit - Home Page)
  if (analyticsData.isInitialVisit) {
    const userInfoDir = path.join(__dirname, 'user_output');
    const userInfoFile = path.join(userInfoDir, 'users_info.txt');

    try {
      fs.mkdirSync(userInfoDir, { recursive: true }); // Create directory if needed

      const formattedData = Object.entries(analyticsData)
        .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`)
        .join('\n');

      fs.appendFileSync(userInfoFile, formattedData + '\n------------------------------------------------------------------------------\n');
      console.log(`User info saved to ${userInfoFile}`);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  }

  // 2. User Interactions (all page visits)
  const interactionsDir = path.join(__dirname, 'user_output');
  const interactionsFile = path.join(interactionsDir, 'usr_interactions.txt');

  try {
    fs.mkdirSync(interactionsDir, { recursive: true }); // Create directory if needed

    const interactionData = `${analyticsData.ip} - ${analyticsData.serverTimestamp} - Page: ${analyticsData.currentPage} - Entry Time: ${analyticsData.entryTime} - Exit Time: ${analyticsData.exitTime || "Not exited yet"} - Duration: ${analyticsData.duration || "Not exited yet"}\n`;
    fs.appendFileSync(interactionsFile, interactionData);
    console.log(`User interaction saved to ${interactionsFile}`);
  } catch (error) {
    console.error("Error saving user interaction:", error);
  }

  res.status(200).json({ message: 'Analytics data received' });
});


app.post('/api/contact', async (req, res) => {  // Contact form route
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