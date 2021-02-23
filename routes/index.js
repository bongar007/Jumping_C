const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("intro"));

// Game
router.get("/game", ensureAuthenticated, (req, res) =>
  res.render("game", {
    user: req.user,
  })
);
router.get("/welcome", (req, res) => res.render("welcome"));

//Intro
router.get("/intro", (req, res) => res.render("intro"));
//About
router.get("/about", (req, res) =>
  res.render("about", {
    user: req.user,
  })
);
//Features
router.get("/features", (req, res) =>
  res.render("features", {
    user: req.user,
  })
);

module.exports = router;
