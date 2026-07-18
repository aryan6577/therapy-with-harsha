import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    const savedToken =
      localStorage.getItem("token");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedToken) {
      setToken(savedToken);
    }

  }, []);

  const login = (userData, jwt) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      jwt
    );

    setUser(userData);
    setToken(jwt);

  };

  const logout = () => {

    localStorage.removeItem("user");
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
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export const useAuth = () =>
  useContext(AuthContext);