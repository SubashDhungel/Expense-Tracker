const express = require('express');
const router = express.Router();
const  {protect}  = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, logOutUser, getUserInfo } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.get('/getUserInfo',protect, getUserInfo);

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Upload failed' });
  }

  res.status(200).json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.path, // Cloudinary URL
  });
});


module.exports = router;
