import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import skillRoutes from './routes/skillRoutes.js'
import userRoutes from './routes/userRoutes.js'
import passport from "passport";
import "./utils/passport.js"
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());
app.use(passport.initialize());



// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/skill', skillRoutes)
app.use('/api/v1/user', authMiddleware, userRoutes)
// app.use('/api/v1/workouts', authMiddleware, verifyEmailMiddleware, workoutRoutes)
// app.use('/api/v1/pr', authMiddleware, verifyEmailMiddleware, prRoutes)


// Default route
app.get('/', async(req, res) => {
    res.send(`Welcome to uniLink API`)
})

// Error handling middleware
app.use(errorHandlerMiddleware)
app.use(notFound)


// Create all the tables
// createAllTables();





app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    
})
