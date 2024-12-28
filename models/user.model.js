import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email should be unique'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
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
    }
}, { timestamps: true });

// Exporting the User model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
