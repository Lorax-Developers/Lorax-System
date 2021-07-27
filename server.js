const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect db
connectDB();

//Init Middleware (allows retrieval of request data in json)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define routes
app.use("/api/user", require("./config/routes/api/user"));
app.use("/api/auth", require("./config/routes/api/auth"));
app.use("/api/bottle", require("./config/routes/api/Bottle"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
