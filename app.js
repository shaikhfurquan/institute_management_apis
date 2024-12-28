import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import fileUpload from 'express-fileupload'
import userRouter from './routes/user.route.js';


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

app.get('*', (req, res) => {
    res.send('Welcome');
})

// routes
app.use('/api/user' , userRouter)

export { app }



