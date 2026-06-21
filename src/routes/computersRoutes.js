const express = require("express");
const router = express.Router();

const {
  getAllComputers,
  getComputerById,
  createComputer,
  updateComputerStatus,
} = require("../controllers/computersController");

const {
  validateComputer,
  validateStatus,
} = require("../middlewares/validateComputer");

// Le fichier routes/ ne fait QUE déclarer "quelle URL appelle quelle fonction".
// Toute la logique vit dans le controller, et la validation dans les middlewares.

router.get("/", getAllComputers);
router.get("/:id", getComputerById);
router.post("/", validateComputer, createComputer);
router.patch("/:id/status", validateStatus, updateComputerStatus);

module.exports = router;
