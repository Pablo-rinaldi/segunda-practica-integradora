const express = require("express");
const app = express();
const PORT = 8080;
const exphbs = require("express-handlebars");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport.config.js");
const imagenRouter = require("./routes/imagen.router.js");
const viewsRouter = require("./routes/views.router.js");
const sessionRouter = require("./routes/session.router.js");
require("../src/database.js");

//handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).single("image"));

//Session
app.use(
  session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//route

app.use("/", imagenRouter);
app.use("/", viewsRouter);
app.use("/", sessionRouter);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
