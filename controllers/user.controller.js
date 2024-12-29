import { request } from "express";
import cloudinary from "../config/cloudinary.config.js";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt'


export const registerUser = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
            // console.log("result" , result);
        })
        const image = {
            public_id: result.public_id,
            url: result.secure_url
        }
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