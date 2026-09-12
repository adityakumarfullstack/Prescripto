//For User Authentication
import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken"
import cloudinary from "cloudinary"


//API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new UserModel(user)
        await newUser.save()

        const UserToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            UserToken,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}


//API for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // if (!email || !password) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please fill all the fields",
        //     })
        // }

        // if (!validator.isEmail(email)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid email",
        //     })
        // }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token,
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req;

        const userData = await UserModel
            .findById(userId)
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "User profile data fetched successfully",
            user: userData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

// API to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.userId;
        const imageFile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Data missing",
            });
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
        };

        // Upload new profile image if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path
            );

            updateData.image = imageUpload.secure_url;
        }

        await UserModel.findByIdAndUpdate(
            userId,
            updateData
        );

        return res.status(200).json({
            success: true,
            message: "User profile data updated successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

export { registerUser, loginUser, getProfile, updateProfile }