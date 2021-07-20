const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect db
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define routes
app.use("/api/users", require("./config/routes/api/users.js"));
app.use("/api/auth", require("./config/routes/api/auth.js"));
app.use("/api/bottle", require("./config/routes/api/Bottle.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
