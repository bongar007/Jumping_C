// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

const app = express();

//Setting Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/assets", express.static(__dirname + "public/assets"));
app.use("/img", express.static(__dirname + "public/assets/img"));

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://testUser:C4gaOqX196WqkRZk@cluster0.3jz3j.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("MongoDb Connected"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(
  session({
    secret: "JavaScript is pretty awesome",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://testUser:C4gaOqX196WqkRZk@cluster0.3jz3j.mongodb.net/test?retryWrites=true&w=majority",
      touchAfter: 24 * 3600, // time period in seconds
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const port = 3000;

app.listen(process.env.PORT || port, function () {
  console.log("Server listening on port 3000");
});
