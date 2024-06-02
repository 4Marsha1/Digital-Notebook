const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db/connectDb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
}))

connectDb();

app.use('/api/v1/notes', require('./routes/notes'))
app.use('/api/v1/pages', require('./routes/pages'))
app.use('/api/v1/fetch-metadata', require('./routes/metadata'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});