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

// Handle clean URLs
app.get('/enrollment', (req, res) => {
    res.sendFile(path.join(__dirname, 'enrollment.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Handle form submissions with Dropbox
app.post('/api/submit-enrollment', async (req, res) => {
    try {
        console.log('Received enrollment submission');
        
        // Create CSV content from form data
        const formData = req.body;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `enrollment_${formData.first_name}_${formData.last_name}_${timestamp}.csv`;
        
        // Convert form data to CSV
        const csvContent = Object.entries(formData)
            .map(([key, value]) => `${key},${value}`)
            .join('\n');

        try {
            // Initialize Dropbox with app key and secret
            const authUrl = await dropbox.getAuthenticationUrl('https://saintdaniels.com/auth/callback');
            console.log('Auth URL:', authUrl);

            // Upload to Dropbox
            const response = await dropbox.filesUpload({
                path: `/enrollments/${filename}`,
                contents: csvContent
            });

            console.log('Successfully uploaded to Dropbox:', filename);
        } catch (dropboxError) {
            console.error('Dropbox error:', dropboxError);
            // Continue with form submission even if Dropbox fails
        }

        res.json({ success: true });

    } catch (error) {
        console.error('Error processing enrollment:', error);
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
        const response = await dropbox.getAccessTokenFromCode('https://saintdaniels.com/auth/callback', code);
        console.log('Got access token:', response);
        res.redirect('/signup');
    } catch (error) {
        console.error('Auth error:', error);
        res.redirect('/signup');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 