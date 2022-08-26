const router = require("express").Router();

// List Routes
const activitiesRoutes = require("./activity.router");
const todosRoutes      = require("./todo.router");

router.use("/activity-groups", activitiesRoutes);
router.use("/todo-items", todosRoutes);

module.exports = router;