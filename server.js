const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//Routes
app.use("/", require("./routes/index"));

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
