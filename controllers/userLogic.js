require('dotenv').config();
const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
// User Signup Logic
async function signup(req, res) {
    try {
        const { name, email, password, preferences } = req.body;
        
        const schema = joi.object({
            name: joi.string().min(2).max(100).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
            preferences: joi.array().items(joi.string()).optional()
        });

        const { error } = schema.validate({ name, email, password, preferences });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userSchema({
            name,
            email,
            password: hashedPassword,
            preferences: preferences || []
        });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}

// User Login Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getPreferences = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing.' });
        }
           const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const updatePreferences = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing.' });
        }
           const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        const { preferences } = req.body;
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.preferences = preferences;
        await user.save();
        res.status(200).json({ message: 'Preferences updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = {
    signup,
    login,
    getPreferences,
    updatePreferences
};
