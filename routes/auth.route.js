const express = require("express");
const router = express.Router();
const authsController = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/auth.middleware");

router.post("/register", authsController.userRegister);
router.post("/login", authsController.userLogin);
router.get("/me", authenticateToken, authsController.getMe);

module.exports = router;
