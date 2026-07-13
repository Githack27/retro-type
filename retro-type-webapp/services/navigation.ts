export type NavRoute = 'home' | 'playground' | 'rankings' | 'settings' | 'about' | 'login' | 'dashboard';
export type Listener = (route: NavRoute) => void;

class NavigationService {
  private currentRoute: NavRoute = 'home';
  private listeners: Set<Listener> = new Set();
  
  // Auth state fields
  private loggedIn: boolean = false;
  private currentUserName: string = 'Operator101';
  private authListeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.checkSession();
    }
  }

  getRoute(): NavRoute {
    return this.currentRoute;
  }

  navigate(route: NavRoute) {
    this.currentRoute = route;
    this.listeners.forEach(listener => listener(route));
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Auth helper methods
  getIsLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserName(): string {
    return this.currentUserName;
  }

  setLoginState(isLoggedIn: boolean, name?: string) {
    this.loggedIn = isLoggedIn;
    if (name) {
      this.currentUserName = name;
    } else if (!isLoggedIn) {
      this.currentUserName = 'Operator101';
    }
    this.authListeners.forEach(listener => listener());
  }

  subscribeAuth(listener: () => void): () => void {
    this.authListeners.add(listener);
    return () => {
      this.authListeners.delete(listener);
    };
  }

  async checkSession() {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.loggedIn) {
          this.setLoginState(true, data.user.username);
        } else {
          this.setLoginState(false);
        }
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
    }
  }

  async apiLogin(identity: string, secret: string): Promise<void> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, secret }),
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Login failed');
    }
    
    const data = await res.json();
    this.setLoginState(true, data.user.username);
  }

  async apiSignup(username: string, email: string, secret: string): Promise<void> {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, secret }),
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Signup failed');
    }
    
    const data = await res.json();
    this.setLoginState(true, data.user.username);
  }

  async apiLogout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      this.setLoginState(false);
    }
  }
}

export const navigationService = new NavigationService();
