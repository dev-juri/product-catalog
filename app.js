var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

var productsRouter = require("./routes/products");
var reviewsRouter = require("./routes/reviews");
var ordersRouter = require("./routes/orders");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/products", productsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ status: false, error: errors[0]});
  }

  res.status(err.status || 500).json({ status: false, error: err.message || "Internal Server Error" });
});

module.exports = app;
