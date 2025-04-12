const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require("cors");
const passport = require("passport")
const session = require("express-session")

//Passport config 
require("./config/passport")

var options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

const PORT = process.env.PORT || 3000;

//Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

(async () => {
  try {
    await connectDB(); //Connection to database
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); 
  }
})();
