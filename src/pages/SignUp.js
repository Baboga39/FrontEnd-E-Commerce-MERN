import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif';
import imageToBase64 from '../helpers/imageToBase64'
import SumaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic:""
  });

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SumaryApi.signUp.url,{
        method: SumaryApi.signUp.method,
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
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
        navigate('/login');
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

    } else{
      toast.error("Password Doesn't Match", {
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

  const handleUploadPic = async(e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file)

    setData((preve)=>{
      return {
        ...preve,
        profilePic: imagePic
      }
    })  
  
  }

  return (
    <section id="signup" className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-6 w-full max-w-sm mx-auto rounded-lg shadow-md'>
        <div className='w-20 h-20 mx-auto mb-6 relative overflow-hidden rounded-full'>
          <div>
          <img src={data.profilePic || loginIcons} alt='Login icons' className='w-full h-full object-cover' />
            </div>     
           <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                  </div>   
                  <input type='file' className='hidden' onChange={handleUploadPic}/>            
                </label>

            </form> 
        </div>


        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='grid gap-1 mb-4'>
            <label className='text-sm font-medium'>Name:</label>
            <div className='bg-slate-200 p-2 rounded'>
              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                value={data.name}
                required
                onChange={handleOnChange}
                className='w-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid gap-1 mb-4'>
            <label className='text-sm font-medium'>Email:</label>
            <div className='bg-slate-200 p-2 rounded'>
              <input
                type='email'
                placeholder='Enter your email'
                name='email'
                value={data.email}
                required
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

          </div>
          <div className='grid gap-1 mb-4'>
            <label className='text-sm font-medium'>Confirm Password:</label>
            <div className='bg-slate-200 p-2 rounded flex items-center'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm your password'
                value={data.confirmPassword}
                name='confirmPassword'
                required
                onChange={handleOnChange}
                className='w-full outline-none bg-transparent'
              />
              <div className='cursor-pointer ml-2' onClick={() => setConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>

              
            </div>
          </div>
          <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full transition-transform transform hover:scale-105'>
            Sign Up
          </button>
        </form>

        <p className='mt-6 text-center'>
          Don't have an account?{" "}
          <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
