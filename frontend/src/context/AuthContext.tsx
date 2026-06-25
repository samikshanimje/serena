import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import {
    loginUser,
    registerUser,
    getProfile,
  } from "../services/authService";
  
  type User = {
    _id: string;
    name: string;
    email: string;
  };
  
  type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
      name: string,
      email: string,
      password: string
    ) => Promise<void>;
    logout: () => void;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  export const AuthProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [user, setUser] = useState<User | null>(null);
  
    const [token, setToken] = useState<string | null>(
      localStorage.getItem("token")
    );
  
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUser = async () => {
        if (!token) {
          setLoading(false);
          return;
        }
  
        try {
          const res = await getProfile(token);
  
          setUser(res.data.user);
        } catch {
          localStorage.removeItem("token");
          setToken(null);
        }
  
        setLoading(false);
      };
  
      loadUser();
    }, [token]);
  
    const login = async (
      email: string,
      password: string
    ) => {
      const res = await loginUser({
        email,
        password,
      });
  
      localStorage.setItem("token", res.data.token);
  
      setToken(res.data.token);
  
      setUser(res.data.user);
    };
  
    const register = async (
      name: string,
      email: string,
      password: string
    ) => {
      await registerUser({
        name,
        email,
        password,
      });
    };
  
    const logout = () => {
      localStorage.removeItem("token");
  
      setUser(null);
  
      setToken(null);
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          register,
          logout,
          loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () =>
    useContext(AuthContext);