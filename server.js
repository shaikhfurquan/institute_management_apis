import dotenv from 'dotenv';
dotenv.config()
import http from 'http'
import { app } from './app.js'
import { connectToDB } from './db/connectDB.js';

const server = http.createServer(app)

connectToDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`server started at ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("Failed to connect database", error);
})
