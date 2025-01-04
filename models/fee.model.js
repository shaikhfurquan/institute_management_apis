import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        // minlength: [10, 'Phone number must be exact 10 digits long'],
        // maxlength: [10, 'Phone number must be exact 10 digits long'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    amount: {
        type: Number,
        required: [true, 'Course amount is required'],
        trim: true,
    },
    remark: {
        type: String,
        trim: true,
        required: [true, 'Remark is required'],
    },
    collectByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

// Exporting the User model
const FeeModel = mongoose.model('Fee', feeSchema);

export default FeeModel;
