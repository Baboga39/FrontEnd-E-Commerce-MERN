import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci"
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({
  data,
  fetchData
}) => {
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4 flex flex-col h-full">
        {/* Image Container */}
        <div className="aspect-square mb-4 rounded-md overflow-hidden bg-gray-50"> 
          <img 
            alt={data.productName} 
            src={data.productImage[0]}  
            className="w-full h-full object-scale-down"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-lg font-medium mb-2 line-clamp-2">
            {data.productName}
          </h1>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              {displayINRCurrency(data.selling)}
            </p>
            <button 
              className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
              onClick={() => setEditProduct(true)}
            >
              <CiEdit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <AdminEditProduct 
          productData={data} 
          onclose={() => setEditProduct(false)} 
          fetchData={fetchData}
        />
      )}
    </div>
  )
}

export default AdminProductCard