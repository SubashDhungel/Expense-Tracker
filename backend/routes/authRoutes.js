const express = require('express');
const router = express.Router();
// const app= express();
const  {protect}  = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, getUserInfo } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUserInfo',protect, getUserInfo);

router.post('/upload-image', upload.single('image',(req,res,next)=>{
    if(!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });

}) );
module.exports = router;
