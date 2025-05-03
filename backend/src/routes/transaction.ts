import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth';
import { CreateTransactionRequest } from '../types/routes';

const prisma = new PrismaClient();
const router = Router();

// Create transaction
router.post('/', authenticateToken, async (req: Request<{}, {}, CreateTransactionRequest>, res: Response): Promise<void> => {
  try {
    const { wasteTypeId, quantity, userId, schoolId } = req.body;

    // Get waste type points per kg
    const wasteType = await prisma.wasteType.findUnique({
      where: { id: wasteTypeId },
    });

    if (!wasteType) {
      res.status(404).json({ message: 'Waste type not found' });
      return;
    }

    // Calculate points
    const points = wasteType.pointsPerKg * quantity;

    // Create transaction with unique ID
    const transaction = await prisma.transaction.create({
      data: {
        id: uuidv4(),
        wasteTypeId,
        quantity,
        points,
        userId,
        schoolId,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user transactions
router.get('/user/:userId', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        wasteType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(transactions);
  } catch (error) {
    console.error('Get user transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get school transactions
router.get('/school/:schoolId', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { schoolId } = req.params;

    const transactions = await prisma.transaction.findMany({
      where: { schoolId },
      include: {
        wasteType: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(transactions);
  } catch (error) {
    console.error('Get school transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
