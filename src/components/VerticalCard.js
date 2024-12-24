import React, { useContext, useEffect, useState } from 'react';
import scrollTop from '../helpers/scrollOnTop';
import displayINRCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';


const VerticalCard = ({loading,data=[]}) => {

    const {fetchUserAddToCart} = useContext(Context);


    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:gap-4  scrollbar-none transition-all'>
        {!loading &&
            data.map((product, index) => (
                <Link to={"/product/"+product._id} key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md" onClick={scrollTop}>
                    <div className="bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                        <img src={product.productImage?.[0] || 'placeholder.jpg'} alt={`Product ${index}`} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'> 
                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.selling)}</p>
                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                        </div>
                        <button className=' text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                    </div>
                </Link>
            ))} 
        </div>
    )
}

export default VerticalCard
