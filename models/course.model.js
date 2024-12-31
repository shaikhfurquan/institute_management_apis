import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    startDate: {
        type: String,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: String,
        required: [true, 'End date is required'],
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
    courseAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// Exporting the User model
const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;
