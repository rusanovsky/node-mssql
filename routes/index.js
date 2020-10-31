var express = require("express");

var router = express.Router();

const { ReadCheckUser, Update, Delete, Insert, SaveUser, GetFaks } = require("../crudFaculties");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});

router.get("/faks", function (req, res, next) {
  GetFaks(req.query.idFaculty, res);
});

router.post("/saveuser", function (req, res, next) {
  console.log(req.body);
  SaveUser(req.body.name, req.body.password, res);
});

router.post("/fak", function (req, res, next) {
  console.log(req.body);
  ReadCheckUser(req.body.name, req.body.password, res);
  // res.render("faculties", { title: "Faculties", id: "gl" });

  // let result = Read(idofuser);
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  // res.location("http://localhost:3000/fak");
  Insert(+req.body.id, req.body.name, req.body.shortname, res);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.id, +req.query.fakId, res);
  // res.location("http://localhost:3000/fak");
  // Insert(+req.body.id, req.body.name, req.body.shortname, res);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateFak", {
    title: "Update",
    id: +req.body.id,
    name: req.body.name,
    shortname: req.body.shortname
  });
  // Delete(+req.body.id, req.body.name, req.body.shortname, res);
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.id,
    req.body.name,
    req.body.shortname,
    req.body.pastname,
    req.body.pastshortname,
    res
  );
});

module.exports = router;
