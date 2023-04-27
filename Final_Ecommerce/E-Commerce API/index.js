const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const bodyParser = require("body-parser");
const path = require("path");
var multer = require("multer");
var async = require("async");
const compression = require("compression");

app.set("view engine", "ejs");
function parallel(middlewares) {
  return function (req, res, next) {
    async.each(
      middlewares,
      function (mw, cb) {
        mw(req, res, cb);
      },
      next
    );
  };
}

app.use(
  parallel([
    express.static(path.join(__dirname, "./uploads")),
    compression(),
    bodyParser.json({ limit: "50mb" }),
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    }),
    multer({ dest: __dirname + "/uploads/" }).any(),
  ])
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Ok It's Done!!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runnning on ${PORT} ........`);
});
