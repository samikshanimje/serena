import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
  
  import {
  getProfile,
  loginUser,
  registerUser,
} from "../services/authService";
  
type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};
  
  type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: (token: string, user: User) => void;
    
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
  
    const googleLogin = (token: string, user: User) => {
      localStorage.setItem("token", token);
    
      setToken(token);
    
      setUser(user);
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
          googleLogin,
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