export const storage = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      // Also set a non-httpOnly cookie so Next.js middleware can detect the session
      // on the server side for route protection. httpOnly is intentionally omitted
      // here because the cookie value is also read by client-side middleware checks.
      // For stronger security, move to an httpOnly cookie set by the backend on login.
      document.cookie = `token=${encodeURIComponent(token)}; path=/; SameSite=Strict`;
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // Expire the cookie as well so the middleware immediately sees no session.
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    }
  },

  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    }
  },

  isAuthenticated: () => {
    return !!storage.getToken();
  },
};
