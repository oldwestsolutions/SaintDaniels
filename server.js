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
app.use(cors());

// Define routes BEFORE static middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/enrollment', (req, res) => {
    res.sendFile(path.join(__dirname, 'enrollment.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/newsletter', (req, res) => {
    res.sendFile(path.join(__dirname, 'newsletter.html'));
});

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'about-us.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/help-center', (req, res) => {
    res.sendFile(path.join(__dirname, 'help-center.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/terms-of-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms-of-service.html'));
});

app.get('/partner-providers', (req, res) => {
    res.sendFile(path.join(__dirname, 'partner-providers.html'));
});

// Serve static files AFTER routes
app.use(express.static(__dirname));

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

// Handle newsletter signups
app.post('/api/newsletter-signup', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Newsletter signup:', email);
        res.json({ success: true });
    } catch (error) {
        console.error('Newsletter signup error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process signup' 
        });
    }
});

// Add catch-all route for debugging
app.use((req, res) => {
    console.log('404 for path:', req.path);
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Newsletter path:', path.join(__dirname, 'newsletter.html'));
}); 