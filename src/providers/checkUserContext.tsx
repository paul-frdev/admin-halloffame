import React, { ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Context = React.createContext({
  isAuthenticated: false,
  setAuth: (data: boolean) => { },
});

export const CheckUserContext = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()


  const checkAuthenticatedUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.user }
      });

      const parseRes = await res.json();

      if (parseRes === true) {
        setIsAuthenticated(true)
        setIsLoading(false)
        navigate("/admin", { replace: true })
      } else {
        setIsAuthenticated(false);
      }

    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    checkAuthenticatedUser()
  }, []);


  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  const value = { isAuthenticated, setAuth }

  return <Context.Provider value={value}>{!isLoading && children}</Context.Provider>;
}

export const useCheckUserContext = () => useContext(Context)