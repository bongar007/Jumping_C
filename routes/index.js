const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res) => res.render("intro", { user: req.user }));

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

router.get("/download", function (req, res) {
  const file = `./public/assets/img/resume.doc`;
  res.download(file); // Set disposition and send it.
});

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
      port: 465,
      secure: false, // use SSL
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    let info = await transporter.sendMail({
      name: req.body.name,
      from: `Email from Portfolio`,
      to: "attila.bongar@gmail.com",
      subject: req.body.subject,
      text: `${req.body.name} from ${req.body.email} says: ${req.body.textarea}`,
    });

    req.flash("success_msg", "Thank you for contacting me!");
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
  res.render("intro");
});

module.exports = router;
