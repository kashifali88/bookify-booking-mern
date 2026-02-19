import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import hotelsRouter from './routes/hotels.js'
import usersRouter from './routes/users.js'
import roomsRouter from './routes/rooms.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const server = express()

server.cors({
    origin: "https://bookify-booking-mern-frontend.onrender.com/",
    Credential: true,
})


const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Successfully connected to MongoDB');
        
    } catch (error) {
        console.error('MongoDB connection failed',error.message);
        
    }
}



// middlewares

server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)
server.use('/api/users',usersRouter)
server.use('/api/hotels',hotelsRouter)
server.use('/api/rooms',roomsRouter)
server.get('/', (req, res) => {
  res.send('Bookify Backend is Live 🚀');
});


// error handling middleware
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'something went wrong';

    res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack
    })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> {
    console.log(`connected to backend on port ${PORT}`);
    connect()
    
})