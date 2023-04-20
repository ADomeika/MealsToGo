import React, { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "./authentication.service";
import { getAuth, signOut } from "firebase/auth";
import { getUser, removeUser, storeUser } from "./authentication.storage";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const retrieveUser = async () => {
    const usr = await getUser();
    if (usr) {
      setUser(usr);
    }
  };

  useEffect(() => {
    retrieveUser();
  }, []);

  const onLogin = async (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then(async ({ user: u }) => {
        await storeUser(u);
        setUser(u);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  };

  const onRegister = async (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    setIsLoading(true);
    registerRequest(email, password)
      .then(async ({ user: u }) => {
        await storeUser(u);
        setUser(u);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  };

  const onLogout = () => {
    setUser(null);
    removeUser();
    signOut(getAuth());
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
