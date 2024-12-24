import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SumaryApi from '../common'
import VerticalCard from './VerticalCard'

const SearchProduct = () => {
    const [loading, setLoading] = useState(0)
    const [data,setData] = useState([]);
    console.log(data)
    const query = useLocation()
    const fetchProduct = async ()=>{
        setLoading(true)
        const response = await fetch(SumaryApi.searchProduct.url+query.search,{
            method: SumaryApi.searchProduct.method,
            credentials: 'include',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({query: query.search})
        })  
        setLoading(false)
        const dataResponse = await response.json();
        setData(dataResponse?.result)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

    return (
    <div className='container mx-auto p-4 '>
        {
            loading && (
             <p className='text-lg text-center'>Loading...</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search result: {data.length}</p>
        {
            data.length===0 &&   !loading && (
            <p className='bg-white text-lg text-center p-4'>No data Found....</p>
            )
        }
         {
            data.length!==0 &&   !loading && (
                <VerticalCard loading={loading} data={data}></VerticalCard>
            )
        }

    </div>
)
}

export default SearchProduct
