require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");
const app = express();
app.use(cors());
//Lectura del body
app.use(express.json());
//db conecction
dbConnection();

app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
