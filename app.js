const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Terlalu banyak request, coba lagi nanti" },
});

app.use(express.json());

const authRoute = require("./routes/auth.route");
app.use("/auth", authLimiter, authRoute);

app.use(errorHandler);

module.exports = app;
