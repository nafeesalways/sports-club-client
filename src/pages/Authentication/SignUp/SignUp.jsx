import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const SignUp = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const {createUser} = use(AuthContext);
    const navigate = useNavigate();

    const onSubmit=(data)=>{
        console.log(data);
        console.log(createUser);
        createUser(data.email,data.password,data.name)
        .then(result=>{
           const user = result.user;
           navigate("/");
            toast.success("User created successfully!",user);
        })
    }
    return (
          <div className="card bg-base-100 mx-auto p-10 m-12 max-w-sm shrink-0 shadow-2xl">
            <h1 className='text-3xl font-bold text-yellow-400 text-center'>Please SignUp Now!</h1>
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
             
              className="input"
              placeholder="Email"
            />
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true,})} className="input" placeholder="Email" />
          {
           errors.email?.type==='required' && <p className='text-red-500'>Email is required</p>
          }
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="input" placeholder="Password" />
          {
            errors.password?.type ==='minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
          }
          <button className="btn bg-yellow-400 mt-4">Sign Up</button>
        <p className='text-gray-600'>Already have an account? <Link className='text-yellow-400 hover:underline text-md font-semibold' to='/signin'>Click here to sign in</Link></p>
        </form>
      </div>
    </div>
    );
};

export default SignUp;