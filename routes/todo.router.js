const router = require("express").Router();
const { body } = require("express-validator");

// Controller
const controller = require("../controllers/todo.controller");

// Routes GET
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

// Routes POST
router.post("/",
  body("title").notEmpty().withMessage("title cannot be null"),
  body("activity_group_id").notEmpty().withMessage("activity_group_id cannot be null"),
  controller.create
)

// Routes PATCH
router.patch("/:id",
  body("title").notEmpty().withMessage("title cannot be null").optional(),
  body("is_active").notEmpty().withMessage("is_active cannot be null").optional(),
  controller.update
)

// Routes DELETE
router.delete("/:id", controller.delete);

module.exports = router;