const router = require("express").Router();
const { body } = require("express-validator");

const controller = require("../controllers/activity.controller");

router.get("/", body("title").notEmpty(), controller.create);

module.exports = router;