const express = require("express");
const path = require("path");

const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"..", "dist")));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
