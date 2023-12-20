const { User } = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const listUsers = async (req, res) => {
    try {
        console.log('here');
        const users = await User.find().select('-password');
        return res.status(200).json(users)
    } catch(error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
    
}

module.exports = {
    listUsers,
}