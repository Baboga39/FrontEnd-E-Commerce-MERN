import React, { useContext, useEffect, useState } from 'react'
import SumaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { FcPrevious } from 'react-icons/fc';


const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.countAddToCart).fill(null);



  const fetchData = async()=>{
    const response = await fetch(SumaryApi.cartProduct.url,{
      method: SumaryApi.cartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }})
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.result)
    }
  }
  const handleLoaing = async()=>{
    setLoading(true)
    await fetchData()
    setLoading(false)
  }
  useEffect(() => {
    handleLoaing()
  }, [])

  const increaseQty = async(id,qty) =>{
    const response = await   fetch(SumaryApi.updateCartProduct.url,{
      method: SumaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({quantity: qty + 1, productId: id}),
    })
    const responseData = await response.json();
    if(responseData.success){
      fetchData()
    }
  }

  const decreaseQty = async(id,qty) =>{
    if(qty >= 2){
      const response = await   fetch(SumaryApi.updateCartProduct.url,{
        method: SumaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity: qty - 1, productId: id}),
      })
  
      const responseData = await response.json();
      if(responseData.success){
        fetchData()
      }
    }
  }
  const deleteCartProduct = async (id)=>{
    const response = await fetch(SumaryApi.deleteCartProduct.url,{
      method: SumaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productId: id}),
    })
    const responseData = await response.json();
    if(responseData.success){
      fetchData()
      context.fetchUserAddToCart()
    }
  }
  const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity,0)
  const totalPrice = data.reduce((previousValue, currentValue)=>previousValue + currentValue.quantity * currentValue.productId.selling,0)
  return (
    <div className='container mx-auto'>
      
      <div className='text-center text-lg my-3'>
      {
        data.length === 0 && !loading && (
          <p className='bg-white py-5'>No data</p>
        )
      }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {
          /*View Product */
        }
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el,index) => {
                return (
                <div key={el+ "Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse rounded'>
                  
                </div>)
              })
            
            ):
            (
              data.map((product, index) => {
                return (
                    <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-1 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                      <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt='Product'/> 
                    </div>
                      <div className='px-4 py-2 relative'>
                        {/*Delete Product */}
                        <div className='absolute right-0 text-red-500 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                        <MdDelete />
                        </div>
                        <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                        <div className='flex items-center justify-between'>
                          <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.selling)}</p>
                          <p className='text-slate-600 font-semibold text-lg'>{displayCurrency(product?.productId?.selling * product.quantity                            )}</p>
                        </div>
                        <p className='capitalize text-slate-500'>{product.productId?.category}</p >
                        <div className='flex items-center gap-3 mt-1'>
                          <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id, product?.quantity)}>-</button>
                          <span>{product?.quantity}</span>
                          <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id, product?.quantity)}>+</button>
                        </div>
                      </div>
                  </div>
                )
              })
            )
          }
        </div>
        {/* Summary */}
      <div className='mt-5 lg:mt-0 w-full max-w-sm'>
      {
          loading ?(
            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
            
            </div>
          ):
          (
            <div className='h-36 bg-slate-200'>
              <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
              <div className='flex items-center justify-between p-4 gap 2 font-medium text-lg text-slate-600'>
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className='flex items-center justify-between p-4 gap 2 font-medium text-lg text-slate-600'>
                <p>Total Price:</p> 
                <p>{totalPrice}</p>
              </div>

              <button className='bg-blue-600 p-4 text-white w-full'>Payment</button>
            </div>
          )
        }
      </div>
      </div>
      
    </div>
  )
}

export default Cart
