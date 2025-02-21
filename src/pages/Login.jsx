import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Login = () => {
  const { signInWithGoogle, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    setLoading(true); 
    signInWithGoogle()
      .then(async (result) => {
        if (!result.user) throw new Error("User not found");
  
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
        };
  
        console.log("User Info:", userInfo);
  
        // Wait for response from backend
        const res = await axiosPublic.post("/add-user", userInfo);
        console.log("Server Response:", res.data);
  
        toast.success("Login Successful!");
        navigate("/"); 
      })
      .catch((err) => {
        console.error("Login Error:", err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false); 
      });
  };
  

  return (
    <div className="flex flex-col justify-center items-center max-w-2xl mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 p-6 shadow-lg h-screen my-auto">
      <button
        disabled={loading}
        onClick={handleGoogleSignIn}
        className="bg-green-600 disabled:bg-gray-400 flex items-center justify-center  p-3 mb-4 border rounded-lg shadow-sm bg-primary-bg text-white hover:shadow-md hover:bg-primary-bg/80 gap-1 w-fit"
      >
        <FcGoogle />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;
