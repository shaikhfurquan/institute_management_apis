import cloudinary from "../config/cloudinary.config.js";
import CourseModel from "../models/course.model.js";

export const addCourse = async (req, res, next) => {
    try {
        // Validate required fields
        if (!req.body.courseName || !req.body.price || !req.body.description || !req.body.startDate || !req.body.endDate) {
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

        const course = new CourseModel({
            courseName: req.body.courseName,
            price: req.body.price,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            image: image,
            courseAdmin: req.user._id
        })
        // save the course
        await course.save()
        res.status(201).json({
            message: "Course added successfully",
            course
        })

    } catch (error) {
        next(error);
    }
}