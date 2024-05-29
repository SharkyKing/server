const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const db = require('./models');
const userRoute = require('./routes/userRoutes');
const meetingRoute = require('./routes/meetingRoutes');
const smsRoute = require('./routes/smsRoutes')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/api/user', userRoute);
app.use('/api/meeting', meetingRoute);
app.use('/api/sms', smsRoute);

db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT, () => {
    console.log(` Database server is running on port: ${process.env.PORT}`)
  })
})

//const user = await User.findOne({ where: { email: 'admin@mail.net'} });
//if (!user) {
//    User.create({ Email:'admin@mail.net', FirstName:'Admin', LastName:'Admin', Password:password });
//}