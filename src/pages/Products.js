import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SumaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetch(SumaryApi.allProduct.url, {
      method: SumaryApi.allProduct.method,
      credentials: 'include',
    })
    const dataResponse = await response.json()
    setAllProducts(dataResponse?.result || [])
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white py-4 px-6 flex justify-between items-center shadow-sm">
        <h2 className="font-bold text-xl">Products</h2>
        <button 
          className="border-2 border-red-600 text-red-600 py-2 px-6 rounded-full hover:bg-red-50 transition-colors"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload product
        </button>
      </div>

      {/* Products Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {allProducts.map((product, index) => (
            <AdminProductCard 
              data={product} 
              key={index + "all product"} 
              fetchData={fetchAllProducts}
            />
          ))}
        </div>
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct 
          onclose={() => setOpenUploadProduct(false)} 
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  )
}

export default Products

