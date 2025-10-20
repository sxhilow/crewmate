import express from 'express'
import { addProject, deleteProject, getAllProjects, getAllRequests, getProject, getRecommendedProject, respondProjectRequest, sendProjectRequest } from '../controller/projectController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllProjects)
router.get('/requests', authMiddleware, getAllRequests)
router.get('/recommended', authMiddleware, getRecommendedProject)
router.get('/:id', getProject)
router.post('/add-project', authMiddleware, addProject)
router.delete('/delete-project/:id', authMiddleware, deleteProject)
router.post('/:id/request', authMiddleware, sendProjectRequest)
router.patch('/:id/request', authMiddleware, respondProjectRequest)


export default router