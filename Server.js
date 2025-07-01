// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const authRoutes = require('./Routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT =  5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
