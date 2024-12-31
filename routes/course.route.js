import express from 'express';
import { addCourse } from '../controllers/course.controller.js';
import { isAuth } from '../middlewares/isAuth.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/add-course', isAuth , addCourse)

export default courseRouter