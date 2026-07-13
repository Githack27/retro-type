import bcryptjs from 'bcryptjs';
import { type IUserRepository } from '../repositories/user.repository.js';
import { type NewUser, type User } from '../db/schema.js';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async signup(data: { username: string; email: string; secret: string }): Promise<User> {
    // Basic validation
    if (!data.username || !data.email || !data.secret) {
      throw new Error('Username, email, and secret key (password) are required.');
    }

    // Check if user already exists
    const existingUserByUsername = await this.userRepository.findByUsername(data.username);
    if (existingUserByUsername) {
      throw new Error('Callsign username is already registered.');
    }

    const existingUserByEmail = await this.userRepository.findByEmail(data.email);
    if (existingUserByEmail) {
      throw new Error('Email is already registered.');
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(data.secret, salt);

    const newUser: NewUser = {
      username: data.username,
      email: data.email,
      passwordHash,
    };

    return this.userRepository.create(newUser);
  }

  async login(data: { identity: string; secret: string }): Promise<User> {
    if (!data.identity || !data.secret) {
      throw new Error('Identity (email/username) and secret key are required.');
    }

    // Find user by email or username
    let user: User | null = null;
    if (data.identity.includes('@')) {
      user = await this.userRepository.findByEmail(data.identity);
    } else {
      user = await this.userRepository.findByUsername(data.identity);
    }

    if (!user) {
      throw new Error('Operator credentials invalid.');
    }

    // Verify password
    const isMatch = await bcryptjs.compare(data.secret, user.passwordHash);
    if (!isMatch) {
      throw new Error('Operator credentials invalid.');
    }

    return user;
  }
}
