const express = require('express');
const app = express();

app.get('/api/info', (req, res) => {
    res.json({
        msg: 'Hello Baby'
    });
});

app.listen(9092);