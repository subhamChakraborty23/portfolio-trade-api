const app = require("./app");
const connectWithDB = require("./config/db");
require("dotenv").config();

//connect with database
connectWithDB()

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });