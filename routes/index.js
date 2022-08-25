const router = require("express").Router();

const activitiesRoutes = require("./activity.router");

router.use("/activity-groups", activitiesRoutes);

module.exports = router;