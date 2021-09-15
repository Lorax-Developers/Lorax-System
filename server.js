const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
//connect db
connectDB();

//Allow cross origin access (cors error fix)
app.use(cors());

//Init Middleware (allows retrieval of request data in json)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//Define routes
app.use("/api/pro", require("./config/routes/api/pro"));
app.use("/api/admin", require("./config/routes/api/admin"));
app.use("/api/user", require("./config/routes/api/user"));
app.use("/api/auth", require("./config/routes/api/auth"));
app.use("/api/addbottle", require("./config/routes/api/bottles/add-bottle"));
app.use(
  "/api/updatebottle",
  require("./config/routes/api/bottles/update-bottle")
);
app.use(
  "/api/totalbottles",
  require("./config/routes/api/bottles/get-number-of-bottles")
);
app.use(
  "/api/totalbottlesmonthly",
  require("./config/routes/api/bottles/get-monthly-total-bottles")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
