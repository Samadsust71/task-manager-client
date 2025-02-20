import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Login = () => {
    const {signInWithGoogle,setLoading,loading} = useAuth()
    const navigate = useNavigate()

    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
        .then(() => {
          setLoading(false)
          toast.success("Login Successfull !!!")
          navigate( "/");
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.message)
        });
    }

  return (
    <div>
      <button disabled={loading} onClick={handleGoogleSignIn} className=" disabled:bg-gray-400 flex items-center justify-center w-full p-3 mb-4 border rounded-lg shadow-sm bg-primary-bg text-white hover:shadow-md hover:bg-primary-bg/80 gap-1">
        <FcGoogle />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;