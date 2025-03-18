const express = require('express');
const path = require('path');
const fetch = require('node-fetch');  // Make sure to install this
const { Dropbox } = require('dropbox');
const session = require('express-session');
const axios = require('axios');

const app = express();

// Enable JSON parsing with increased limit
app.use(express.json({ limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index page at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve the enrollment page
app.get('/enrollment', (req, res) => {
    res.sendFile(path.join(__dirname, 'enrollment.html'));
});

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

// Dropbox configuration
const DROPBOX_CONFIG = {
    clientId: '55yt9dc51h22wwn',
    clientSecret: 'bnszbd6yizzw5zg',
    accessToken: 'sl.BqGXXXX'  // Replace with your access token
};

// Initialize Dropbox client
const dbx = new Dropbox({
    accessToken: DROPBOX_CONFIG.accessToken
});

// Add reCAPTCHA secret configuration
const RECAPTCHA_SECRET_KEY = '6LfFsvgqAAAAAFJNIANU1rZpPBBUlNlU2oZJKpEt';

// OAuth endpoints
app.get('/auth/dropbox', (req, res) => {
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_CONFIG.clientId}&response_type=code&redirect_uri=${encodeURIComponent(DROPBOX_CONFIG.redirectUri)}`;
    res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    
    try {
        const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                grant_type: 'authorization_code',
                client_id: DROPBOX_CONFIG.clientId,
                client_secret: DROPBOX_CONFIG.clientSecret,
                redirect_uri: DROPBOX_CONFIG.redirectUri,
            }),
        });

        const data = await response.json();
        req.session.dropboxToken = data.access_token;
        
        // Send success message to parent window
        res.send(`
            <script>
                window.opener.postMessage({ type: 'dropbox-auth-success' }, '*');
            </script>
        `);
    } catch (error) {
        console.error('OAuth error:', error);
        res.redirect('/auth/error');
    }
});

// Check auth status
app.get('/auth/status', (req, res) => {
    res.json({
        authenticated: !!req.session.dropboxToken
    });
});

// Update your upload endpoint to verify reCAPTCHA first
app.post('/api/upload-to-dropbox', async (req, res) => {
    try {
        // Verify reCAPTCHA first
        const recaptchaResponse = req.body.recaptcha;
        const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;
        
        const recaptchaResult = await axios.post(verifyURL);
        
        if (!recaptchaResult.data.success) {
            throw new Error('reCAPTCHA verification failed');
        }

        // Rest of your existing upload code...
        const { filename, content } = req.body;
        
        if (!content) {
            throw new Error('No content provided');
        }

        // Initialize Dropbox client
        const dbx = new Dropbox({ 
            accessToken: DROPBOX_CONFIG.accessToken
        });

        // Convert content to CSV format
        const jsonContent = JSON.parse(content);
        const csvRows = Object.entries(jsonContent).map(([key, value]) => `${key},${value}`);
        const csvContent = csvRows.join('\n');
        
        // Upload to Dropbox
        console.log('Attempting to upload:', filename);
        const response = await dbx.filesUpload({
            path: `/enrollments/${filename}`,
            contents: Buffer.from(csvContent, 'utf-8'),
            mode: 'add'
        });

        console.log('Upload successful:', response);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to process request'
        });
    }
});

// Serve thank you page
app.get('/thank-you', (req, res) => {
    res.sendFile(__dirname + '/thank-you.html');
});

// Success and error routes
app.get('/auth/success', (req, res) => {
    res.send(`
        <h1>Successfully authenticated with Dropbox!</h1>
        <p>Access Token: ${req.session.dropboxToken}</p>
        <p>You can now close this window and use the application.</p>
    `);
});

app.get('/auth/error', (req, res) => {
    res.send('Failed to authenticate with Dropbox.');
});

// Add proper error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        // Don't send stack traces in production
        ...(process.env.NODE_ENV !== 'production' && { details: err.stack })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Dropbox API configured with provided keys');
}); 