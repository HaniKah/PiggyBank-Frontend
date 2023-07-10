import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [linkToken, setLinkToken] = useState(null)
  const [linkSuccess, setLinkSuccess] = useState(false)

  useEffect(() => {
    console.log("starting useEffect 1...")
    const storedToken = localStorage.getItem("token");
    const storedLinkToken = localStorage.getItem("linkToken");

    console.log("storedToken", storedToken);
    console.log("storedLinkToken", storedLinkToken);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedLinkToken) {
      setLinkToken(storedLinkToken)
    }
  }, []);

  useEffect(() => {
    console.log("starting useEffect 2...")
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if(linkToken) {
      localStorage.setItem("linkToken", linkToken)
      console.log("store linktoken")
    } else {
      localStorage.removeItem("linkToken")
      console.log("remove linktoken")
    }
  }, [token, linkToken]);

  const login = (newToken, newLinkToken) => {
    setToken(newToken);
    setLinkToken(newLinkToken)
  };

  const logout = () => {
    setToken(null);
    setLinkToken(null)
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, 
      linkToken, setLinkToken, linkSuccess, setLinkSuccess,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}
