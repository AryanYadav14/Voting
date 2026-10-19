
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../Models/UserSchema');
const authMiddleware = require('../authMiddleware');

const route = express.Router();

// GET /profile - Get authenticated user's profile
route.get('/Profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Profile fetched successfully',
            user
        });

    } catch (err) {
        console.error('Profile error:', err);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// PUT /profile/password - Change password
route.put('/Profile/password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                error: 'New password must be at least 8 characters'
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                error: 'New password must differ from current password'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                error: 'Current password is incorrect'
            });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.status(200).json({
            message: 'Password changed successfully'
        });

    } catch (err) {
        console.error('Password change error:', err);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

module.exports = route;
