import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SumaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setPassword] = useState(false);
  const navigate = useNavigate();
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

  

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dataResponse = await fetch(SumaryApi.signIn.url,{
      method: SumaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      toast.success( dataApi.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/')
      fetchUserDetails();
      fetchUserAddToCart();
    } else{
      toast.error(dataApi.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-6 w-full max-w-sm mx-auto rounded-lg shadow-md'>
        <div className='w-20 h-20 mx-auto mb-6 relative overflow-hidden rounded-full'>
          <img src={loginIcons} alt='Login icons' className='w-full h-full object-cover' />
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='grid gap-1 mb-4'>
            <label className='text-sm font-medium'>Email:</label>
            <div className='bg-slate-200 p-2 rounded'>
              <input 
                type='email' 
                placeholder='Enter your email'
                name='email'
                required
                value={data.email}
                onChange={handleOnChange}
                className='w-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid gap-1 mb-4'>
            <label className='text-sm font-medium'>Password:</label>
            <div className='bg-slate-200 p-2 rounded flex items-center'>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter your password' 
                value={data.password}
                name='password'
                required
                onChange={handleOnChange} 
                className='w-full outline-none bg-transparent'
              />
              <div className='cursor-pointer ml-2' onClick={() => setPassword(!showPassword)}> 
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link to={'forgot-password'} className='block text-right text-red-600 hover:underline'> 
              Forgot Password
            </Link>
          </div>

          <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full transition-transform transform hover:scale-105'>
            Login
          </button>
        </form>

        <p className='mt-6 text-center'>
          Don't have an account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
