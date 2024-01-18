
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const tokenRoutes = require('./routes/tokenRoutes'); 
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('DeliveryHub API is running!');
  });

// Connect to MongoDB using the connection URL from the .env file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.use('/api/users', userRoutes);
    app.use('/api/userProfile', userProfileRoutes);
    app.use('/api/tokens', tokenRoutes);

    app.use('/api', routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
