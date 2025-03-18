const express = require('express');
const path = require('path');
const fetch = require('node-fetch');  // Make sure to install this
const { Dropbox } = require('dropbox');
const session = require('express-session');
const app = express();

// Serve static files from the current directory
app.use(express.static('./'));

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

// Enable JSON parsing and session handling
app.use(express.json());
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

// Dropbox configuration with your keys
const DROPBOX_CONFIG = {
    clientId: '55yt9dc51h22wwn',      // Your App key
    clientSecret: 'bnszbd6yizzw5zg',   // Your App secret
    accessToken: null  // This will be set after authentication
};

// Initialize Dropbox client
const dbx = new Dropbox({
    clientId: DROPBOX_CONFIG.clientId,
    clientSecret: DROPBOX_CONFIG.clientSecret
});

// Upload endpoint
app.post('/api/upload-to-dropbox', async (req, res) => {
    try {
        const { filename, content } = req.body;
        
        if (!content) {
            throw new Error('No content provided');
        }

        // Use the configured Dropbox client
        const dropboxClient = new Dropbox({ 
            clientId: DROPBOX_CONFIG.clientId,
            clientSecret: DROPBOX_CONFIG.clientSecret,
            accessToken: req.session.dropboxToken || DROPBOX_CONFIG.accessToken
        });

        const contentBuffer = Buffer.from(content, 'utf-8');
        console.log('Attempting to upload:', filename);

        const response = await dropboxClient.filesUpload({
            path: `/enrollments/${filename}`,
            contents: contentBuffer,
            mode: 'add'
        });

        console.log('Upload successful:', response);
        res.json({ success: true, response });
    } catch (error) {
        console.error('Dropbox upload error:', error);
        res.status(500).json({ 
            error: 'Failed to upload to Dropbox', 
            details: error.message 
        });
    }
});

// Add authentication endpoint
app.get('/auth/dropbox', (req, res) => {
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_CONFIG.clientId}&response_type=token&redirect_uri=${encodeURIComponent('http://localhost:3000/auth/callback')}`;
    res.redirect(authUrl);
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

// Test route to check if token exists
app.get('/auth/status', (req, res) => {
    res.json({
        authenticated: !!req.session.dropboxToken,
        token: req.session.dropboxToken
    });
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