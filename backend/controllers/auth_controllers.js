const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const generateTokenSetCookie = require('../utils/generateToken');

const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password do not match' })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'Username already exits' })
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            //Generate JWT Token here
            generateTokenSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: 'Invalid user data' })
        }

    }
    catch (error) {
        console.log('Error in signup controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        // if(!user){
        //     return res.status(400).json({error: "User not found"})
        // }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenSetCookie(user._id, res);

        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    }
    catch (error) {
        console.log('Error in login controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"})
    }
    catch (error) {
        console.log('Error in login controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { signupUser, loginUser, logoutUser }