const router = require("express").Router();
const patternsController = require("../../controllers/patternsController");

// Matches with "/api/patterns"
router.route("/")
  .get(patternsController.findAll)
  // .get(patternsController.find)
  .post(patternsController.create);

// Matches with "/api/patterns/:id"
router
  .route("/:id")
  .get(patternsController.findById)
  .put(patternsController.update)
  .delete(patternsController.remove);

module.exports = router;