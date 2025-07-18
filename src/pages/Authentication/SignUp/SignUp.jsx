import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import UseAxios from "../../../hook/UseAxios";

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
  const axiosInstance = UseAxios();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    console.log(imageUploadUrl)
    const res = await axios.post(imageUploadUrl, formData);
    console.log(res)
    setProfilePic(res.data.data.display_url);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(createUser);
    createUser(data.email, data.password, data.name).then(async(result) => {
      const user = result.user;

      const userInfo={
        name:data.name,
        email:data.email,
        role: 'user',//default role
        created_at: new Date().toISOString(),
        last_log_in:  new Date().toISOString(),
      }

      const userRes = await axiosInstance.post('/users',userInfo);
      console.log(userRes.data);
      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };
      updateUserProfile(userProfile)
        .then(() => {
          navigate(from);
          console.log("profile pic updated");
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/");
      toast.success("User created successfully!", user);
    });
  };
  return (
    <div className="card bg-base-100 mx-auto p-10 m-12 max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-bold text-yellow-400 text-center">
        Please SignUp Now!
      </h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
          <label className="label">Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="input"
            placeholder="Image"
          />
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          <button className="btn bg-yellow-400 mt-4">Sign Up</button>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-yellow-400 hover:underline text-md font-semibold"
              to="/signin"
            >
              Click here to sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
