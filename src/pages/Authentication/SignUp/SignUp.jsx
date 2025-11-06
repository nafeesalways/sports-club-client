import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import UseAxios from "../../../hook/UseAxios";
import { FaUser, FaEnvelope, FaLock, FaImage, FaUserPlus, FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosInstance = UseAxios();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(image);

    // Upload to imgbb
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.display_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Image upload failed. Please try again.");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!profilePic) {
      toast.error("Please upload a profile picture");
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(data.email, data.password, data.name);
      const user = result.user;
      console.log(user)

      const userInfo = {
        name: data.name,
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post('/users', userInfo);

      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };

      await updateUserProfile(userProfile);
      toast.success("Account created successfully!");
      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-400 text-sm">Create your account</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-yellow-400/20 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 px-6 py-4 border-b border-yellow-400/20">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaUserPlus className="text-yellow-400" />
              Join Champion
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign up to start booking courts
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="w-8 h-8 text-gray-600" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-4 py-3 hover:bg-gray-800 hover:border-yellow-400/50 transition-all">
                      {uploading ? (
                        <>
                          <FaSpinner className="w-5 h-5 animate-spin text-yellow-400" />
                          <span className="text-sm">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <FaImage className="w-5 h-5" />
                          <span className="text-sm">Choose Image</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>

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
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
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
                    placeholder="Create a password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaUserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-yellow-400 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-yellow-400 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
