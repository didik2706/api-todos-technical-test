const router = require("express").Router();
const { body } = require("express-validator");

// controller
const controller = require("../controllers/activity.controller");

// Routes GET
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

// Routes POST
router.post("/", body("title").notEmpty().withMessage("title cannot be null"), controller.create);

// Routes PATCH
router.patch("/:id", body("title").notEmpty().withMessage("title cannot be null"), controller.update);

// Routes DELETE
router.delete("/:id", controller.delete);

module.exports = router;