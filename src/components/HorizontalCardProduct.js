import React, { useEffect,useContext, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetcCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';


const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollElement = useRef();
    const {fetchUserAddToCart} = useContext(Context);

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        await fetchUserAddToCart()
    }


    // Fetch product data
    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(Array.isArray(categoryProduct?.result) ? categoryProduct.result : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle scroll buttons
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 280;
    };
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 280;
    };

    useEffect(() => {
        fetchData();
    }, [category]); // Fetch data again if category changes

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h1 className="text-2xl font-semibold py-4">{heading}</h1>

            {/* Loading */}
            {loading && <div>Loading...</div>}

            {/* No products found */}
            {!loading && data.length === 0 && <div>No products found</div>}

            <div
                className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all relative"
                ref={scrollElement}
            >
                {/* Scroll buttons */}
                <button
                    className="bg-white shadow-md rounded-full p-1 left-0 text-lg hidden md:block absolute"
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="bg-white shadow-md rounded-full p-1 right-0 text-lg hidden md:block absolute"
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {/* Product Cards */}
                {!loading &&
                    data.map((product, index) => (
                        <Link to={"product/"+product._id} div
                            key={index}
                            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
                        >
                            <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]">
                                <img
                                    src={product.productImage?.[0] || 'placeholder.jpg'}
                                    alt={`Product ${index}`}
                                    className="object-scale-down h-full hover:scale-110 transition-all"
                                />
                            </div>
                            <div className="p-4 grid">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 rounded-full">
                                    {product.productName}
                                </h2>
                                <p className="capitalize text-slate-500">{product?.category}</p>
                                <div className="flex gap-3">
                                    <p className="text-red-600 font-medium">
                                        {displayINRCurrency(product?.selling)}
                                    </p>
                                    <p className="text-slate-500 line-through">
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <button className=' text-sm bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    ))}

                {/* Skeleton loading */}
                {loading &&
                    Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-slate-200 rounded-sm shadow-md animate-pulse"
                            ></div>
                        ))}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
