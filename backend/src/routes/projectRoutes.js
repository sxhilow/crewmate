import express from 'express'
import { addProject, deleteProject, getAllProjects, getProject, sendProjectRequest } from '../controller/projectController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/add-project', authMiddleware, addProject)
router.delete('/delete-project/:id', authMiddleware, deleteProject)
// router.get('/:id/requests')
router.post('/:id/request', authMiddleware, sendProjectRequest)
// router.patch('/:id/request')


export default router