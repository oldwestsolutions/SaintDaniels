const express = require('express');
const path = require('path');
const { Dropbox } = require('dropbox');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Dropbox with App Key and App Secret
const dropbox = new Dropbox({ 
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(cors());

// Serve enrollment.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'enrollment.html'));
});

// Handle form submissions
app.post('/api/submit-enrollment', async (req, res) => {
    try {
        console.log('Received enrollment submission');
        
        // Get OAuth2 token
        const authResponse = await dropbox.getAuthenticationUrl('http://localhost:3000/auth/callback', null, 'code');
        console.log('Auth URL:', authResponse);
        
        // Create CSV content from form data
        const formData = req.body;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `enrollment_${formData.first_name}_${formData.last_name}_${timestamp}.csv`;
        
        // Convert form data to CSV
        const csvContent = Object.entries(formData)
            .map(([key, value]) => `${key},${value}`)
            .join('\n');

        // Upload to Dropbox
        const response = await dropbox.filesUpload({
            path: `/enrollments/${filename}`,
            contents: csvContent
        });

        console.log('Successfully uploaded to Dropbox:', filename);
        res.json({ success: true });

    } catch (error) {
        console.error('Error uploading to Dropbox:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process enrollment' 
        });
    }
});

// Handle Dropbox OAuth callback
app.get('/auth/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const response = await dropbox.getAccessTokenFromCode('http://localhost:3000/auth/callback', code);
        console.log('Got access token:', response);
        // Store this token securely for future use
        res.send('Authentication successful!');
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).send('Authentication failed');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 