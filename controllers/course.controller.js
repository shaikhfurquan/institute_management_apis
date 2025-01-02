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
            courseAdminId: req.user._id
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

// GET ALL Course ADDED BY LOGIN USER
export const getAllCourse = async (req, res, next) => {
    try {
        const getAllCourses = await CourseModel.find({ courseAdmin: req.user._id })
        if (!getAllCourses) {
            return res.status(200).json({ message: 'Course not found' })
        }
        console.log(getAllCourses);
        res.status(201).json({
            message: "Courses fetched successfully",
            courseCount: getAllCourses.length,
            courses: getAllCourses
        })

    } catch (error) {
        next(error);
    }
}


// GET Course By Id(login user)
export const getCourseById = async (req, res, next) => {
    try {
        const getCourseById = await CourseModel.findById(req.params.courseId)
        if (!getCourseById) {
            return res.status(200).json({ message: 'Course not found' })
        }
        res.status(201).json({
            message: "Course fetched successfully",
            course: getCourseById
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// delete Course By Id(login user)
export const deleteCourseById = async (req, res, next) => {
    try {
        const course = await CourseModel.findById(req.params.courseId)

        // verifying that courseAdmin and logged in user
        if (String(course.courseAdminId) !== String(req.user._id)) {
            return res.status(404).json({ message: "You are not allowed to delete the course" });
        }
        // deleting course
        const deleteCourse = await CourseModel.findByIdAndDelete(req.params.courseId)
        // deleting the course image from the cloudinary
        cloudinary.uploader.destroy(course.image.public_id)

        res.status(201).json({
            message: "Course deleted successfully"
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}