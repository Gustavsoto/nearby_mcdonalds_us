const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.get('/mcdonalds-locations', async (req, res) => {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const radius = req.query.radius || 50;
        const maxResults = req.query.maxResults || 30;
        const country = req.query.country || 'us';
        const language = req.query.language || 'en-us';
        const apiUrl = `https://www.mcdonalds.com/googleappsv2/geolocation?` +
                      `latitude=${latitude}&longitude=${longitude}&` +
                      `radius=${radius}&maxResults=${maxResults}&` +
                      `country=${country}&language=${language}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from McDonald\'s API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
