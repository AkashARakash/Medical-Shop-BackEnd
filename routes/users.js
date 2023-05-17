var express = require("express");
var router = express.Router();
var { User } = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((signup) => {
      // console.log(signup)
    })
    .then(() => {
      res.redirect("/users/login");
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  let query = {
    username: req.body.username,
    password: req.body.password,
  };
  User.findOne(query).then((login) => {
    // console.log(login)
    if (login) {
      req.session.username=login.username
      res.redirect("/");
    } else {
      res.redirect("/users");
    }
  });
});
router.get('/logout',(req,res)=>{
  req.session.username = null
  res.redirect('/users')
})

module.exports = router;
