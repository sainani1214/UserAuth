const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, getUserProfile} = require('../controllers/auth-controller');
const {isLoggedIn} = require('../middlewares/isLoggedIn');


router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/logout", logoutUser)
router.get("/profile", isLoggedIn, getUserProfile)

module.exports = router;