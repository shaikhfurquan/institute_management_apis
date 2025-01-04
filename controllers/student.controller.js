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
            addedByUserId: req.user._id
        })
        // save the course
        await student.save()
        res.status(201).json({
            message: "student added successfully",
            student
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// GET ALL Students ADDED BY LOGIN/OWN USER
export const getAllStudent = async (req, res, next) => {
    try {
        const getAllStudent = await StudentModel.find({ addedByUserId: req.user._id })
        if (!getAllStudent) {
            return res.status(200).json({ message: 'Course not found' })
        }
        res.status(201).json({
            message: "Students fetched successfully",
            studentCount: getAllStudent.length,
            students: getAllStudent
        })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// GET all own students by respected course/for a course
export const getStudentsByCourse = async (req, res, next) => {
    try {
        const getStudentsByCourse = await StudentModel.find({ addedByUserId: req.user._id, courseId: req.params.courseId });
        if (!getStudentsByCourse) {
            return res.status(200).json({ message: 'Course/Students not found' })
        }

        res.status(200).json({
            message: "Students with respected course fetched successfully",
            studentsCount: getStudentsByCourse.length,
            students: getStudentsByCourse
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// DELETE the student added By user only
export const deleteStudentById = async (req, res, next) => {
    try {
        const student = await StudentModel.findById(req.params.studentId)
        if (!student) {
            return res.status(200).json({ message: 'student not found' })
        }

        // verifying that addedbyuser student and logged in user
        if (String(student.addedByUserId) !== String(req.user._id)) {
            return res.status(404).json({ message: "You are not allowed to delete the student" });
        }
        // deleting student
        const deletestudent = await StudentModel.findByIdAndDelete(req.params.studentId)
        // deleting the student image from the cloudinary
        cloudinary.uploader.destroy(student.image.public_id)

        res.status(201).json({
            message: "student deleted successfully"
        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}


// Update Course By ID (logged-in user)
export const updateStudentById = async (req, res, next) => {
    try {
        // Retrieve the course by ID
        let student = await StudentModel.findById(req.params.studentId);
        if (!student) {
            return res.status(200).json({ message: 'student not found' });
        }

        // Verify the logged-in user is the student admin
        if (String(student.addedByUserId) !== String(req.user._id)) {
            return res.status(404).json({ message: "You are not allowed to update the student" });
        }

        // Initialize image object with the current student image
        let updatedImage = student.image;

        // Handle new image upload if provided
        if (req.files?.image) {
            // Delete the old image from Cloudinary
            if (student.image?.public_id) {
                await cloudinary.uploader.destroy(student.image.public_id);
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

        // Prepare the updated student data
        const updatedStudent = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            courseId: req.body.courseId,
            image: updatedImage,
            addedByUserId: req.user._id
        };

        // Update the student in the database
        const updatedStudentDoc = await StudentModel.findByIdAndUpdate(req.params.studentId, updatedStudent, { new: true });

        // Respond with the updated student details
        return res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudentDoc
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


// GET latest 5 student added by login user
export const getLatestStudents = async (req, res, next) => {
    try {
        const latestStudent = await StudentModel.find({ addedByUserId: req.user.id })
            .sort({ $natural: -1 }).limit(5)

        res.status(200).json({
            message: "Latest Students fetched successfully",
            latestStudent

        })
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID", error: error.message });
        }
        next(error);
    }
}