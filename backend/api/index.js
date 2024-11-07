const express = require("express");
const path = require("path");
const connectDB = require('./db');
const routes = require('./routes/routes');
const {errorHandler} = require("./routes/middleware");

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"..", "dist")));


app.use('/api', routes);

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

/* Custom middlewares */
app.use(errorHandler);  // Middleware to catch all errors


const setup = async () => {
  await connectDB();
  
  // Start server only after a connection to db is made
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
setup()

module.exports = app;
