import { useEffect, useState } from "react";

import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import auth from "../firebase/firebase.config";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const googleAuthProvider = new GoogleAuthProvider()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  
  const signOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      if (currentUser?.email) {
        const user ={email:currentUser.email}
        axios.post("https://meal-bridge-server.vercel.app/jwt",user,{withCredentials:true})
        .then(()=>{
          setLoading(false)
        })
      }else{
        axios.post("https://meal-bridge-server.vercel.app/logout",{},{
          withCredentials:true
        })
        .then(()=>{
          setLoading(false)
        })
      }
    })
    return ()=>{
      unSubscribe()
    }
  },[])

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    signOutUser,
    signInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;