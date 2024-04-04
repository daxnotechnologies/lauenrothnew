import React, { useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function ResetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function logout() {
    return signOut(auth);
  }

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user', user);
      if (user && user.uid) {
        getDoc(doc(db, 'users', user?.uid))
          .then((doc) => {
            user.role = doc.data().role;
            user.displayName = `${doc.data().surename}`;
            setCurrentUser(user);
          })
          .then((user) => {
            setloaded(true);
          })
          .catch((error) => {
            setloaded(true);
          });
      } else {
        setloaded(true);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    login,
    loaded,
    createUser,
    ResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
