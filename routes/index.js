const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);

//Intro
router.get("/intro", ensureAuthenticated, (req, res) =>
  res.render("intro", {
    user: req.user,
  })
);
//About
router.get("/about", ensureAuthenticated, (req, res) =>
  res.render("about", {
    user: req.user,
  })
);
//Features
router.get("/features", ensureAuthenticated, (req, res) =>
  res.render("features", {
    user: req.user,
  })
);

module.exports = router;
