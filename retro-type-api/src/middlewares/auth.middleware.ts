import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const session = (req as any).session;
  if (session && session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication required. Operator session not found.' });
  }
}
