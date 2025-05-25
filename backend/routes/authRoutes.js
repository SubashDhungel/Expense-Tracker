const express = require('express');
const router = express.Router();
const app= express();

const{
    regsiterUser,
    loginUser,
    getUserInfo,
}=require('../controllers/authController');

router.post('/register', regsiterUser);
router.post('/login', loginUser);

router.get('/user-info',protect, getUserInfo);

module.exports = router;
