const express = require('express');
const app = express();
const allUrl = require('./src/config/hostId');
const cors = require('cors');

const { mongoose } = require('./src/config/db');
const bodyParser = require('body-parser');
const routes = require('./src/routes/route');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: allUrl.frontEnd }));

app.use('/', routes);

app.listen(3000, () =>
    console.log('Server started at port: 3000'));

