import cloudinary from "../config/cloudinary.config.js";
import UserModel from "../models/user.model.js";
import fs from 'fs'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
    try {
        // Validate required fields
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // validate the image
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image is required" });
        }
        // upload the image
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
            // console.log("result" , result);
        })
        const image = {
            public_id: result.public_id,
            url: result.secure_url
        }

        // Delete the image from the local temp folder
        fs.unlink(req.files.image.tempFilePath, (err) => {
            if (err) {
                console.error("Error while deleting temp file:", err.message);
            }
        });

        // checking if the user already exists
        const existingUser = await UserModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        // hashing the password
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const newUser = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            image: image
        })
        await newUser.save()
        res.status(201).json({
            messsage: "User signup successful",
            user: newUser
        })


    } catch (error) {
        // Handle duplicate email errors
        // if (error.code === 11000) {
        //     return res.status(409).json({ message: 'Email already exists' });
        // }
        next(error);
    }
}


export const loginUser = async (req, res, next) => {
    try {
        // checking if the user exists
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "All fields are required" })
        }
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        // hashing the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ _id: user._id, }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRESIN })
        user.password = undefined
        res.status(200).cookie("token", token).json({
            messsage: `Welcome ${user.firstName} ${user.lastName}`,
            token,
            user
        })


    } catch (error) {
        // Handle duplicate email errors
        // if (error.code === 11000) {
        //     return res.status(409).json({ message: 'Email already exists' });
        // }
        next(error);
    }
}
