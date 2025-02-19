require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const apiRoutes = require('./routes/apiRoutes');

const app = express(); 
app.use(express.json()); 
app.use(cors()); 
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app; 