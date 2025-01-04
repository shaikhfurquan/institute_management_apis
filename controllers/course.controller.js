import cloudinary from "../config/cloudinary.config.js";
import CourseModel from "../models/course.model.js";
import StudentModel from "../models/student.model.js";
import fs from 'fs'

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

        // Delete the image from the local temp folder
        fs.unlink(req.files.image.tempFilePath, (err) => {
            if (err) {
                console.error("Error while deleting temp file:", err.message);
            }
        });

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
        const getAllCourses = await CourseModel.find({ courseAdminId: req.user._id })
        if (!getAllCourses) {
            return res.status(200).json({ message: 'Course not found' })
        }
        console.log(getAllCourses);
        res.status(200).json({
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
        // finding the students associated with the course
        const students = await StudentModel.find({ courseId: req.params.courseId })
        res.status(200).json({
            message: "Course fetched successfully",
            course: getCourseById,
            studentsLists: students
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
        if (!course) {
            return res.status(200).json({ message: 'Course not found' })
        }

        // verifying that courseAdmin and logged in user
        if (String(course.courseAdminId) !== String(req.user._id)) {
            return res.status(404).json({ message: "You are not allowed to delete the course" });
        }
        // deleting course
        const deleteCourse = await CourseModel.findByIdAndDelete(req.params.courseId)
        // deleting the course image from the cloudinary
        cloudinary.uploader.destroy(course.image.public_id)

        res.status(200).json({
            message: "Course deleted successfully"
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// Update Course By ID (logged-in user)
export const updateCourseById = async (req, res, next) => {
    try {
        // Retrieve the course by ID
        let course = await CourseModel.findById(req.params.courseId);
        if (!course) {
            return res.status(200).json({ message: 'Course not found' });
        }

        // Verify the logged-in user is the course admin
        if (String(course.courseAdminId) !== String(req.user._id)) {
            return res.status(404).json({ message: "You are not allowed to update the course" });
        }

        // Initialize image object with the current course image
        let updatedImage = course.image;

        // Handle new image upload if provided
        if (req.files?.image) {
            // Delete the old image from Cloudinary
            if (course.image?.public_id) {
                await cloudinary.uploader.destroy(course.image.public_id);
            }
            // Upload the new image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            // Update the image object with new upload details
            updatedImage = {
                public_id: uploadResponse.public_id,
                url: uploadResponse.secure_url
            };
        }

        // Delete the image from the local temp folder
        // fs.unlink(req.files.image.tempFilePath, (err) => {
        //     if (err) {
        //         console.error("Error while deleting temp file:", err.message);
        //     }
        // });

        // Prepare the updated course data
        const updatedCourse = {
            courseName: req.body.courseName,
            price: req.body.price,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            image: updatedImage,
            courseAdminId: req.user._id
        };

        // Update the course in the database
        const updatedCourseDoc = await CourseModel.findByIdAndUpdate(req.params.courseId, updatedCourse, { new: true });

        // Respond with the updated course details
        return res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourseDoc
        });

    } catch (error) {
        // Handle invalid ID errors
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        // Handle other errors
        next(error);
    }
};


// GET latest 5 course added by login user
export const getLatestFiveCourses = async (req, res, next) => {
    try {
        const latestFiveCourse = await CourseModel.find({ courseAdminId: req.user.id })
            .sort({ $natural: -1 }).limit(5)

        res.status(200).json({
            message: "Latest five Course fetched successfully",
            latestFiveCourse

        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}