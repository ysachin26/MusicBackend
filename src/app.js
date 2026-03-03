const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const cors = require('cors');
const app = express();
const musicRoutes = require('./routes/music.routes')
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)
module.exports = app;