require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");

var authRouter = require("./routes/AuthRoute");
var userRouter = require("./routes/UsersRoute");
var productsRouter = require("./routes/ProductsRoute");
var reviewsRouter = require("./routes/ReviewsRoute");
var ordersRouter = require("./routes/OrdersRoute");
const { connectDB } = require("./config/database");
const { swaggerSpec } = require("./config/SwaggerConfig");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to Database
connectDB();

app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// App's routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
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
    return res.status(400).json({ status: false, error: errors[0] });
  }

  res
    .status(err.status || 500)
    .json({ status: false, error: err.message || "Internal Server Error" });
});

process.on("SIGINT", () => {
  process.exit(0);
});

module.exports = app;
