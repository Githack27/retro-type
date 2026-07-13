import { Request, Response } from 'express';
import { type AuthService } from '../services/auth.service.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, secret } = req.body;
      const user = await this.authService.signup({ username, email, secret });
      
      // Establish session using cookie-session
      const session = (req as any).session;
      if (session) {
        session.userId = user.id;
        session.username = user.username;
      }
      
      res.status(201).json({
        message: 'Registration successful',
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { identity, secret } = req.body;
      const user = await this.authService.login({ identity, secret });

      // Establish session using cookie-session
      const session = (req as any).session;
      if (session) {
        session.userId = user.id;
        session.username = user.username;
      }

      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      // Clear cookie-session
      (req as any).session = null;
      res.status(200).json({ message: 'Session terminated successfully.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  me = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = (req as any).session;
      if (session && session.userId) {
        res.status(200).json({
          loggedIn: true,
          user: { id: session.userId, username: session.username },
        });
      } else {
        res.status(200).json({ loggedIn: false });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
