const express = require('express');
const path = require('path');
const app = express();

// Enable trust proxy for GCP
app.set('trust proxy', true);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint for GCP
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Handle all routes by sending index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 