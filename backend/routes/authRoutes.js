const express = require('express');
const router = express.Router();
// const app= express();
const  {protect}  = require('../middleware/authMiddleware');

const { registerUser, loginUser, getUserInfo } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/getUserInfo',protect, getUserInfo);

module.exports = router;
