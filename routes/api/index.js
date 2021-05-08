const router = require("express").Router();
const patternRoutes = require("./patterns");

// Book routes
router.use("/patterns", patternRoutes);

module.exports = router;
