const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./Config/db');
const app = express();
const UserRoute = require('./ROUTER/user');
const adminRoute = require('./ROUTER/admin');
const cors = require('cors');

connectDB();

const corsOption = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'production') {
      callback(null, process.env.CLIENT_URL_PROD);
    } else if (process.env.NODE_ENV === 'development') {
      callback(null, process.env.CLIENT_URL_DEV);
    } else {
      callback(null, '*'); // Allow all origins in other environments
    }
  }
};

app.use(express.json());
app.use(cors(corsOption));

app.get('/', (req, res) => {
  res.send("server created");
});

app.use('/api/user', UserRoute);
app.use('/api/admin', adminRoute);

app.listen(3000, () => {
  console.log("server is listening at port 3000");
});
