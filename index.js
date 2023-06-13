require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ?? 5000;

app.listen(port,e => {
    e ? console.error(e) : console.log('Server is listening on port '+port)
});
