import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../utils/api";

const AuthContext = createContext(null);
const TOKEN_STORAGE_KEY = "doordine_auth_token";
const USER_STORAGE_KEY = "doordine_auth_user";

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(readStoredUser);
  const [profileLoading, setProfileLoading] = useState(false);

  const saveSession = useCallback((nextToken, nextUser) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response = await api.post("login/", credentials);
      saveSession(response.data.token, response.data.user);
      return response.data;
    },
    [saveSession]
  );

  const register = useCallback(async (payload) => {
    const response = await api.post("register/", payload);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("logout/");
    } catch {
      // Clear the browser session even if the server token is expired.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const refreshProfile = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      return null;
    }

    setProfileLoading(true);

    try {
      const response = await api.get("profile/");
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearSession();
      }

      throw error;
    } finally {
      setProfileLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    if (token && !user) {
      refreshProfile().catch(() => {});
    }
  }, [refreshProfile, token, user]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      profileLoading,
      refreshProfile,
      register,
      token,
      user,
    }),
    [
      login,
      logout,
      profileLoading,
      refreshProfile,
      register,
      token,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
