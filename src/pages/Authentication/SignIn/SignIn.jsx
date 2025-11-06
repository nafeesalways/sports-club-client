import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import UseAxios from "../../../hook/UseAxios";
import { FaEnvelope, FaLock, FaGoogle, FaSignInAlt } from "react-icons/fa";

const SignIn = () => {
  const { googleSignIn, signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const axiosInstance = UseAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Signed in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error (${errorCode}): ${errorMessage}`);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post('/users', userInfo);
        console.log('user update info', res.data);

        navigate(from);
        toast.success("Signed in with Google successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              className="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
              alt="Champion"
            />
            <span className="font-black text-yellow-400 text-3xl italic">
              CHAMPION
            </span>
          </div>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaSignInAlt className="text-yellow-400" />
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Please enter your credentials to continue
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-yellow-400 bg-gray-900 border-gray-700 rounded focus:ring-yellow-400"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <FaSignInAlt className="w-5 h-5" />
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-gray-800 to-black text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full btn bg-white hover:bg-gray-100 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-yellow-400 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-yellow-400 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
