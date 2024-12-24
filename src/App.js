import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SumaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context/index';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
  const dispatch = useDispatch();
  const [countAddToCart, setCountToCart] = useState(0);
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SumaryApi.current_user.url,{
      method: SumaryApi.current_user.method,
      credentials: 'include',
    })
    const dataApi = await dataResponse.json();
    
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.result));
     
    } else {
      // handle error
    }
    
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SumaryApi.countAddToCartProduct.url,{
      method: SumaryApi.countAddToCartProduct.method,
      credentials: 'include',
    })
    const dataApi = await dataResponse.json();
    console.log(dataApi.result)
    setCountToCart(dataApi?.result)
  }

  useEffect(()=>{

    /*Count Add To Cart */
    fetchUserAddToCart()

    /* User Details */
    fetchUserDetails()
  },[])

  return (
  <>

  <Context.Provider value={{
    countAddToCart,
    fetchUserAddToCart,
    fetchUserDetails
  }}>
    <ToastContainer
    position='top-center'
    />
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16 '>
    <Outlet/>
    </main>
    <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
