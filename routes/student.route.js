import express from 'express';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { addStudent } from '../controllers/student.controller.js';

const studentRouter = express.Router();

studentRouter.post('/add-student', isAuth, addStudent)

export default studentRouter