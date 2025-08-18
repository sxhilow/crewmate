import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import "./config/db.js"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import skillRoutes from './routes/skillRoutes.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import passport from "passport";
import "./utils/passport.js"
import { authMiddleware } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173', // for local development
  "https://accounts.google.com/"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allows cookies and authorization headers
}));

app.use(passport.initialize());



// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/skill', skillRoutes)
app.use('/api/v1/user', authMiddleware, userRoutes)
app.use('/api/v1/project', projectRoutes)
app.use('/api/v1/notification', authMiddleware, notificationRoutes)
app.use('/api/v1/team', authMiddleware, teamRoutes)
// app.use('/api/v1/workouts', authMiddleware, verifyEmailMiddleware, workoutRoutes)
// app.use('/api/v1/pr', authMiddleware, verifyEmailMiddleware, prRoutes)


// Default route
app.get('/', async(req, res) => {
    res.send(`Welcome to uniLink API`)
})

// Error handling middleware
app.use(errorHandlerMiddleware)
app.use(notFound)


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    
})
