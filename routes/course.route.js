import express from 'express';
import { addCourse, getAllCourse } from '../controllers/course.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/add-course', isAuth, addCourse)
courseRouter.get('/get-all', isAuth, getAllCourse)

export default courseRouter