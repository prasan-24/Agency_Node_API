const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db.config');

const authRouter = require('./routes/auth.routes');
const agencyClientRouter = require('./routes/agencyclient.routes');

connectDB();

//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

//Routes Middleware

app.use('/api/user', authRouter);
app.use('/api/agency-client', agencyClientRouter);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})