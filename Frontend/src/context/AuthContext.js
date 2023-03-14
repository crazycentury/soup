import React, { createContext, useEffect, useState } from "react";

import { TOKEN_KEY, validateToken } from "../api/auth";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
 

  const storeLoginData = (data) => {
    setUser(data.user_data);
    localStorage.setItem(TOKEN_KEY, data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  // Try to "login" using stored token after page refresh
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setIsValidatingToken(false);
      return;
    }

    validateToken(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        const res = err?.response

        // Remove token if token has expired or is invalid
        if (res?.status === 400) {
          localStorage.removeItem(TOKEN_KEY)
        }

        setUser(null);
      })
      .finally(() => {
        setIsValidatingToken(false);
      });
  }, []);

  const value = {
    user,
    isValidatingToken,
    storeLoginData,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthProvider };
