require("dotenv").config();
const express = require("express");
const cors = require("cors");

const globalError = require("./middlewares/errorMiddleware");
const db = require("./database/dbConnection");
const mountRoutes = require("./routes");
const ApiError = require("./utils/apiError");

db.authenticate()
  .then((conn) => {
    console.log(`DataBase Connected`);
  })
  .catch((err) => {
    console.log(`Error conncting to db ${err.message}`)
  });

const app = express();

app.use(cors());

app.use(express.json());

mountRoutes(app);
app.get("/sync", async (req, res) => {
    await db.sync({ force: true});
    res.send("synced");
  });
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log(`App is up & running on port: ${process.env.PORT}`);
});
