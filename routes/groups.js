var express = require("express");
var router = express.Router();

const { Get, Create, Delete, Update, GetGroups } = require("../crudGroups");

/* GET groups listing. */
router.get("/", (req, res, next) => {
  console.log(req.query);
  Get(req.query.id, res);
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  Create(+req.body.id, req.body.name, +req.body.course, res);
});

router.get("/delete", (req, res, next) => {
  console.log(req.query);
  Delete(+req.query.fakId, +req.query.groupId, res);
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  res.render("updateGroup", {
    title: "updateGroup",
    idFak: +req.body.idFak,
    idGroup: +req.body.idGroup,
    name: req.body.name,
    course: +req.body.course
  });
});

router.post("/save", (req, res, next) => {
  console.log(req.body);
  Update(+req.body.idFak, +req.body.idGroup, req.body.name, +req.body.course, res);
});

router.get("/grops", (req, res, next) => {
  console.log(req.query);
  GetGroups(+req.query.idGroup, res);
});

module.exports = router;
