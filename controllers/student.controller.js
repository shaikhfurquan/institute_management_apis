import cloudinary from "../config/cloudinary.config.js";
import CourseModel from "../models/course.model.js";
import StudentModel from "../models/student.model.js";
import fs from 'fs'

export const addStudent = async (req, res, next) => {
    try {
        // Validate required fields
        if (!req.body.fullName || !req.body.email || !req.body.address || !req.body.phone || !req.body.courseId) {
            return res.status(400).json({ message: "All fields are required" })
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

        const student = new StudentModel({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            courseId: req.body.courseId,
            image: image,
            userId: req.user._id
        })
        // save the course
        await student.save()
        res.status(201).json({
            message: "student added successfully",
            student
        })

    } catch (error) {
        next(error);
    }
}


