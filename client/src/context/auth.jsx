import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

//1 step: call the createcontext and store in a constant like navigation
const AuthContext = createContext();

//2 step: make a arrow function which had two part first one contain all state and
// second part is return which we wrap children from provider
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //defoult set
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// makin own hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
