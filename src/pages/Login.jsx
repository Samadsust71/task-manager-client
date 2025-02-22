import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";

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
    <div className="w-11/12 mx-auto flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center max-w-xl mx-auto rounded-xl bg-gray-100 dark:bg-gray-800 p-6 lg:p-10 shadow-lg  space-y-6 ">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Welcome to Task Manager
        </h1>
        <p className="text-gray-800 dark:text-gray-200 text-center mt-2">
          Stay organized and boost your productivity. Sign in to manage your
          tasks efficiently.
        </p>
        <Button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className=""
        >
          <FcGoogle />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
