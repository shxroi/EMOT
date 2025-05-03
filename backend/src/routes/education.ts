import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, checkRole } from '../middleware/auth';
import { AuthenticatedRequest, CreateEducationalContentRequest } from '../types/routes';

const router = Router();
const prisma = new PrismaClient();

// Get all educational modules
router.get('/modules', async (_req: Request, res: Response): Promise<void> => {
  try {
    const modules = await prisma.educationalModule.findMany();
    res.json(modules);
  } catch (error) {
    console.error('Get educational modules error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific module
router.get('/modules/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const module = await prisma.educationalModule.findUnique({
      where: { id }
    });
    
    if (!module) {
      res.status(404).json({ error: 'Module not found' });
      return;
    }
    
    res.json(module);
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create educational module (admin/developer only)
router.post('/modules', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: AuthenticatedRequest & { body: CreateEducationalContentRequest }, res: Response): Promise<void> => {
  try {
    const { title, content, type, pointsReward } = req.body;
    const module = await prisma.educationalModule.create({
      data: {
        title,
        content,
        type,
        pointsReward
      }
    });
    res.status(201).json(module);
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update educational module (admin/developer only)
router.put('/modules/:id', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: AuthenticatedRequest & { body: CreateEducationalContentRequest & { active?: boolean, pointsReward?: number } }, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, type, active, pointsReward } = req.body;
    const module = await prisma.educationalModule.update({
      where: { id },
      data: {
        title,
        content,
        type,
        active,
        pointsReward
      }
    });
    res.json(module);
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete educational module (admin/developer only)
router.delete('/modules/:id', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.educationalModule.update({
      where: { id },
      data: { active: false },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
