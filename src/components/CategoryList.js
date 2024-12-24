import React, { useEffect, useState } from 'react'
import SumaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryProduct = () => {

  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setloading] = useState(false);

  const categoryLoading = new Array(13).fill(null)

  const fectchCategoryProduct = async()=>{
    setloading(true);
    const response = await fetch(SumaryApi.categoryProduct.url,{
      method: SumaryApi.allProduct.method,
      credentials: 'include',
    })
    const dataResponse = await response.json()
    setloading(false);
    setCategoryProduct(dataResponse.result)
  }

  useEffect(() => {
    fectchCategoryProduct()
  },[]);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-center overflow-x-auto scrollbar-none'>
      {
        loading ? (
        
          categoryLoading.map((el,index)=>{
            return (
              <div className='h-10 w-10 md:w-20 md:h=20 rounded-full overflow-hidden bg-slate-200' key={"categoryLoading"+ index}>
            
              </div>
            )
          })
        ) :
        (
          categoryProduct.map((product,index)=>{
            return (
              <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}> 
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center'> 
                  <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 trasition-all' ></img>
                </div>
                <p className='text-center text-sm md:text-base uppercase'>{product?.category}</p>
              </Link>
            )
          })
        )
      }
      </div>
    </div>
  )
}

export default CategoryProduct
