const express = require('express');
const path = require('path');
const { Dropbox } = require('dropbox');
const axios = require('axios');
const app = express();

// Basic middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// Dropbox configuration
const DROPBOX_CONFIG = {
    clientId: '55yt9dc51h22wwn',
    clientSecret: 'bnszbd6yizzw5zg',
    accessToken: 'sl.BqGXXXX'  // Your Dropbox access token
};

// reCAPTCHA configuration
const RECAPTCHA_SECRET_KEY = '6LfFsvgqAAAAAFJNIANU1rZpPBBUlNlU2oZJKpEt';

// Upload endpoint
app.post('/api/upload-to-dropbox', async (req, res) => {
    try {
        const { filename, content } = req.body;
        
        if (!content) {
            throw new Error('No content provided');
        }

        const dbx = new Dropbox({ 
            accessToken: DROPBOX_CONFIG.accessToken
        });

        const contentBuffer = Buffer.from(content, 'utf-8');
        console.log('Attempting to upload:', filename);

        const response = await dbx.filesUpload({
            path: `/enrollments/${filename}`,
            contents: contentBuffer,
            mode: 'add'
        });

        console.log('Upload successful:', response);
        res.json({ success: true });
    } catch (error) {
        console.error('Dropbox upload error:', error);
        res.status(500).json({ 
            error: 'Failed to upload to Dropbox', 
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 