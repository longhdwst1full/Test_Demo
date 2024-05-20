const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
