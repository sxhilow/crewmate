import express from 'express'
import { addProject, deleteProject, getAllProjects, getProject } from '../controller/projectController.js';

const router = express.Router();

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/add-project', addProject)
router.delete('/delete-project/:id', deleteProject)

export default router