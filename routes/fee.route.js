import express from 'express';
import { isAuth } from '../middlewares/isAuth.middleware.js';
import { addFee } from '../controllers/fee.controller.js';

const feeRouter = express.Router();

feeRouter.post('/add-fee' , isAuth , addFee)


export default feeRouter