var express = require("express");
var router = express.Router();

const { Get, Create, Delete, Update } = require("../crudStudents");

router.get("/", (req, res, next) => {
  console.log(req.query);
  Get(+req.query.idGroup, res);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.groupId, +req.query.studentId, res);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateStudent", {
    title: "updateStudent",
    idStudent: +req.body.idStudent,
    idGroup: +req.body.idGroup,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });
});

router.post("/updates", (req, res, next) => {
  console.log(req.body);
  // res.render("updateStudent", {
  //   title: "updateStudent",
  //   idStudent: +req.body.idStudent,
  //   idGroup: +req.body.idGroup,
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone
  // });
  res.json({
    title: "updateStudent",
    phone: req.body.phone
  });
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(
    +req.body.idGroup,
    +req.body.idStudent,
    req.body.name,
    req.body.email,
    req.body.phone,
    res
  );
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  Create(+req.body.idGroup, req.body.name, req.body.email, req.body.phone, res);
});

module.exports = router;
