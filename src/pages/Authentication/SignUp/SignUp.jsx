import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const SignUp = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();

    const onSubmit=(data)=>{
        console.log(data)
    }
    return (
          <div className="card bg-base-100 mx-auto p-10 mt-20 max-w-sm shrink-0 shadow-2xl">
            <h1 className='text-3xl font-bold text-yellow-400 text-center'>Please SignUp Now!</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
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
          <button className="btn bg-yellow-400 mt-4">Login</button>
        </form>
        <p className='text-gray-600'>Already have an account?<Link className='text-yellow-400 hover:underline text-md font-semibold' to='/signin'>Click here to sign in</Link></p>
      </div>
    </div>
    );
};

export default SignUp;