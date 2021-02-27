const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("intro"));

// Game
router.get("/game", ensureAuthenticated, (req, res) =>
  res.render("game", {
    user: req.user,
  })
);
router.get("/welcome", (req, res) =>
  res.render("welcome", {
    user: req.user,
  })
);

//Intro
router.get("/intro", (req, res) =>
  res.render("intro", {
    user: req.user,
  })
);
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

//Contact Me form

router.post("/contact", (req, res) => {
  async function main() {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      name: req.body.name,
      from: req.body.email,
      to: "bongar007@gmail.com",
      subject: req.body.subject,
      text: req.body.textarea,
    });

    req.flash("success_msg", "Thank you for contacting me!");
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
  res.render("intro");
});

module.exports = router;
