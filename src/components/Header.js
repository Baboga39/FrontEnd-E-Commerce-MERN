import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SumaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';



const Header = () => {

    const user = useSelector(state=>state?.user?.user);
    const dispatch = useDispatch();
    const [menuDisplay,setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const negative = useNavigate();
    const handleLogout = async()=>{
        const fetchData = await fetch(SumaryApi.logout.url,{
            method: SumaryApi.logout.method,
            credentials: 'include',
        })
        const data = await fetchData.json();

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        } else {
            toast.error(data.message)
        }
    }

    const handleSearch = (e)=>{
        const value = e.target.value

        if(value){
            negative(`/search?q=${value}`)
        }
        else{
            negative('/search')
        }

    }

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>    
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                    <Logo w={100} h ={60}/>
                    </Link>
                </div>

                
                <div className=' hidden lg:flex items-center w-full max-w-sm justify-between border rounded-full focuse-within:shadow pl2 '>
                    <input type="text" placeholder='Search Product Here..' onChange={handleSearch} className='w-full outline-none pl-2'/>
                    <div className='text-lg min-w-[50px]: h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                    <GrSearch />
                    </div>
                </div>

                <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center' >
                    {
                        user?._id && (
                            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=> setMenuDisplay(preve => !preve)}>
                            {
                                user?.profilePic ?(
                                    <img src={user?.profilePic} alt='User profile' className='w-8 h-8 rounded-full' />
                                ): (
                                    <FaRegUserCircle />
                                )
                            }
                            </div>
                        )
                    }



                    {
                        
                        menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
                                <nav>
                                    {
                                        user?.role?.includes(ROLE.ADMIN) && (
                                            <Link to ={"/admin-panel/products"} className='whitespace-nowrap  hover:bg-slate-100 p-2'>Admin Panel</Link>
                                        )
                                    }
                                    
                                </nav>
                    </div>
                        )
                    }


                </div>
                {
                    user?._id && (
                        <Link to={"/cart"} className='text-2xl relative'>
                        <span>
                        <FaCartShopping />
                        </span>
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>{context?.countAddToCart}</p>
                        </div>
                        </Link>
                    )
                }
                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 rounded-full  bg-red-600 hover:bg-red-700 text-white'>Logout</button>
                            ) : (
                                <Link to={"/login"} className='px-3 py-1 rounded-full  bg-red-600 hover:bg-red-700 text-white' >Login</Link>
                            )
                        }
                
                </div>
                </div>
            </div>
        </header>
    )
    }

    export default Header
