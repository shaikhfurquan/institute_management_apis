import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email should be unique']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    image: {
        public_id: {
            type: String,
            required: [true, "Image ID is required"],
        },
        url: {
            type: String,
            required: [true, "Image URL is required"],
        },
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    addedByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// Exporting the User model
const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;
