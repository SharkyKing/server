const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const db = require('./models');
const userRoute = require('./routes/userRoutes');
const meetingRoute = require('./routes/meetingRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use('/api/user', userRoute);
app.use('/api/meeting', meetingRoute);

db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT, () => {
    console.log(` Database server is running on port: ${process.env.PORT}`)
  })
})