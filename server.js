const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const db = require('./models');
const userRoute = require('./routes/userRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use('/api/user', userRoute);

db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT, () => {
    console.log(` Database server is running on port: ${process.env.PORT}`)
  })
})