const express = require("express");
const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/", getAll);
router.post("/", protect, isAdmin, create);
router.put("/:id", protect, isAdmin, update);
router.delete("/:id", protect, isAdmin, remove);

module.exports = router;
