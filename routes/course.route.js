import express from 'express';
import { addCourse, deleteCourseById, getAllCourse, getCourseById, getLatestFiveCourses, updateCourseById } from '../controllers/course.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/add-course', isAuth, addCourse)
courseRouter.get('/get-all', isAuth, getAllCourse)
courseRouter.get('/get/:courseId', isAuth, getCourseById)
courseRouter.delete('/delete/:courseId', isAuth, deleteCourseById)
courseRouter.put('/update/:courseId', isAuth, updateCourseById)
courseRouter.get('/latest-courses', isAuth, getLatestFiveCourses)

export default courseRouter