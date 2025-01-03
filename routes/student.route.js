import express from 'express';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { addStudent, getAllStudent, getStudentsByCourse } from '../controllers/student.controller.js';

const studentRouter = express.Router();

studentRouter.post('/add-student', isAuth, addStudent)
studentRouter.get('/get-all', isAuth, getAllStudent)
studentRouter.get('/get-all/:courseId', isAuth, getStudentsByCourse) // students with respected course

export default studentRouter