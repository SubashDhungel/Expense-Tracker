const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate jwt token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

//Register user
exports.registerUser = async (req, res) => {
    const { name, email, password, profileImageUrl } = req.body;
  
    // validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required !' });
    }
    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({ name, email, password, profileImageUrl });
       
        // Generate token
        const token = generateToken(user._id);   
        res.status(201).json({
            _id: user._id,
            user,
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error'});
    }
   
};

//Register user
exports.loginUser = async (req, res) => {
   
};

//Register user
exports.getUserInfo = async (req, res) => {
   
};



