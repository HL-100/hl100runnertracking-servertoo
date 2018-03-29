// const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const runners = require("./routes/runners");
const twilio = require("./routes/twilio");
const morgan = require("morgan");
const devMode = process.env.NODE_ENV !== "production";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(devMode ? "dev" : "combined"));
app.use(cors());

app.get("/api/beta", (req, res) => {
  res.json({
    message: "Welcome to the High Lonesome 100 Runner API"
  });
});

app.use("/api/beta/", runners);
app.use("/api/beta/", twilio);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   // res.status(err.status || 500);
//   // res.render("error");
// });

app.use(notFound);
app.use(errorHandler);

function notFound(req, res, next) {
  const url = req.originalUrl;
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important auto requests
    console.error("[404: Requested file not found] ", url);
  }
  res.status(404).send({ error: "Url not found", status: 404, url });
}

function errorHandler(err, req, res, next) {
  console.error("ERROR", err);
  const stack = devMode ? err.stack : undefined;
  res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}

module.exports = app;
