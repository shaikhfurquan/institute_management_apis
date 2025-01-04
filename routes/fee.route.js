import express from 'express';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { addFee, getAllFeeStudentCourse, getFeeCollectionData } from '../controllers/fee.controller.js';

const feeRouter = express.Router();

feeRouter.post('/add-fee', isAuth, addFee)
feeRouter.get('/fee-history', isAuth, getFeeCollectionData)
feeRouter.get('/all-fee', isAuth, getAllFeeStudentCourse)


export default feeRouter