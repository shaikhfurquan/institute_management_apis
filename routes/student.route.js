import express from 'express';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { addStudent, deleteStudentById, getAllStudent, getStudentsByCourse, updateStudentById } from '../controllers/student.controller.js';

const studentRouter = express.Router();

studentRouter.post('/add-student', isAuth, addStudent)
studentRouter.get('/get-all', isAuth, getAllStudent)
studentRouter.get('/get-all/:courseId', isAuth, getStudentsByCourse) // students with respected course
studentRouter.delete('/delete/:studentId', isAuth, deleteStudentById)
studentRouter.put('/update/:studentId', isAuth, updateStudentById)

export default studentRouter