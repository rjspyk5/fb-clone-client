import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userr) => {
      setuser(userr);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email, pass) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const signIn = (email, pass) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    setloading(true);
    return signOut(auth);
  };

  const updateUser = (name, photo) => {
    setloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, loading, logOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
