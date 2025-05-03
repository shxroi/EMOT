import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'DEVELOPER';
  schoolId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateTransactionRequest {
  wasteTypeId: string;
  quantity: number;
  userId: string;
  schoolId: string;
}

export interface CreateWasteTypeRequest {
  name: string;
  pointsPerKg: number;
  description: string;
}

export interface CreateEducationalContentRequest {
  title: string;
  content: string;
  type: 'ARTICLE' | 'VIDEO' | 'QUIZ';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'DEVELOPER';
  schoolId?: string;
}
