const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config');
const { User, Doctor, Consultation } = require('./models'); 
const authRoutes = require('./routes/authRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const path = require('path');

dotenv.config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middlewarejpg
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'));

const PORT = 4000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));