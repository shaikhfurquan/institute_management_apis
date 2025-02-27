import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import studentRouter from './routes/student.route.js';
import feeRouter from './routes/fee.route.js';


const app = express();


// express middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(fileUpload({
    useTempFiles: true,
    // tempFileDir : '/tmp/'
    // limits : {fileSize : 50 * 1024 * 1024}
}))
app.use(express.json());
app.use(cookieParser());

app.get('/test', (req, res) => {
    res.send('Welcome');
})

// routes
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/student', studentRouter)
app.use('/api/fee', feeRouter)

export { app }



