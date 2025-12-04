const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Statik dosyaları sun
app.use(express.static(path.join(__dirname, '/')));

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});