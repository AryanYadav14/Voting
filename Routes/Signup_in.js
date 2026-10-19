const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const route = express.Router();
const User = require('./../Models/UserSchema');

route.post('/SignUp', async (req, res) => {
    try {
        const { name, aadharNum, password } = req.body;

        if (!name || !aadharNum || !password) {
            return res.status(400).json({
                error: 'Name, Aadhaar number and password are required'
            });
        }

        const existingUser = await User.findOne({ aadharNum });

        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists'
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user (role defaults to voter)
        const newUser = new User({
            name,
            aadharNum,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'Signup successful'
        });

    } catch (err) {
        console.error('Signup error:', err);

        if (err.code === 11000) {
            return res.status(409).json({
                error: 'User already exists'
            });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                error: err.message
            });
        }

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});



route.post('/login', async (req, res) => {
    try {
        const { aadharNum, password } = req.body;

        if (!aadharNum || !password) {
            return res.status(400).json({
                error: 'Aadhaar number and password are required'
            });
        }

        const user = await User.findOne({ aadharNum });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Login error:', err);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});



module.exports = route;
