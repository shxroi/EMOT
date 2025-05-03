import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, checkRole } from '../middleware/auth';
import { AuthenticatedRequest, CreateWasteTypeRequest } from '../types/routes';

const router = Router();
const prisma = new PrismaClient();

// Get all waste types
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const wasteTypes = await prisma.wasteType.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });

    res.json(wasteTypes);
  } catch (error) {
    console.error('Get waste types error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create waste type (admin only)
router.post('/', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: AuthenticatedRequest & { body: CreateWasteTypeRequest }, res: Response): Promise<void> => {
  try {
    const { name, pointsPerKg, description } = req.body;

    const wasteType = await prisma.wasteType.create({
      data: {
        name,
        pointsPerKg,
        description,
      },
    });

    res.status(201).json(wasteType);
  } catch (error) {
    console.error('Create waste type error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update waste type (admin only)
router.put('/:id', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: AuthenticatedRequest & { body: CreateWasteTypeRequest }, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, pointsPerKg, description } = req.body;

    const wasteType = await prisma.wasteType.update({
      where: { id },
      data: {
        name,
        pointsPerKg,
        description,
      },
    });

    res.json(wasteType);
  } catch (error) {
    console.error('Update waste type error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete waste type (admin only)
router.delete('/:id', authenticateToken, checkRole(['ADMIN', 'DEVELOPER']), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.wasteType.update({
      where: { id },
      data: { active: false },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete waste type error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
