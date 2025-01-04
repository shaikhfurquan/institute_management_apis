import CourseModel from "../models/course.model.js";
import StudentModel from "../models/student.model.js";
import UserModel from "../models/user.model.js";
import FeeModel from "../models/fee.model.js";

export const addFee = async (req, res, next) => {
    try {
        if (!req.body.fullName || !req.body.email || !req.body.phone || !req.body.amount || !req.body.remark || !req.body.courseId) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }

        const newFee = new FeeModel({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            amount: req.body.amount,
            remark: req.body.remark,
            courseId: req.body.courseId,
            collectByUserId: req.user._id

        })
        const savedFee = await newFee.save();
        res.status(201).json({
            message: "Fee collected successfully",
            collectedFee: savedFee
        })

    } catch (error) {
        next(error);
    }
}
