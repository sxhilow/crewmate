import express from 'express'
import { addProject, deleteProject, getAllProjects, getProject } from '../controller/projectController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/add-project', authMiddleware, addProject)
router.delete('/delete-project/:id', authMiddleware, deleteProject)

export default router