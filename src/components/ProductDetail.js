import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SumaryApi from '../common';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from './CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetail = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        price: "",
        selling: "",
        description: "",
    });
    const { fetchUserAddToCart } = useContext(Context);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const productImageList = new Array(4).fill(null);
    const [activeImage, setActiveImage] = useState("");
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
    const [zoomImage, setZoomImage] = useState(false);
    const navigate = useNavigate();

    const handleZoomImage = useCallback((e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        let x = (e.clientX - left) / width;
        let y = (e.clientY - top) / height;
        x = Math.max(0, Math.min(x, 1));
        y = Math.max(0, Math.min(y, 1));
    
        setZoomImage(true);
        setZoomImageCoordinate({ x, y });
    }, []);

    const handleLeaveImageZoom = useCallback(() => {
        setZoomImage(false);
    }, []);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SumaryApi.productDetail.url, {
                method: SumaryApi.productDetail.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: params?.id }),
            });
            const dataResponse = await response.json();
            setData(dataResponse?.result);
            setActiveImage(dataResponse?.result?.productImage[0]);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
        navigate('/cart');
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* Product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
                        <img 
                            src={activeImage} 
                            className='h-full w-full object-scale-down mix-blend-multiply' 
                            onMouseEnter={handleZoomImage} 
                            onMouseMove={handleZoomImage} 
                            onMouseLeave={handleLeaveImageZoom} 
                            alt='Product' 
                        />
                        {/* Product Zoom */}
                        {zoomImage && (
                            <div className='hidden lg:block absolute min-w=[400px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                <div
                                    className='w-full min-h-[400px] min-w-[500px] h-full bg-slate-200 mix-blend-multiply scale-125'
                                    style={{
                                        background: `url(${activeImage})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                    <div className='h-full'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-x-auto scrollbar-none'>
                                {productImageList.map((_, index) => (
                                    <div className='h-20 w-20 bg-slate-400 rounded animate-pulse' key={`loadingImage${index}`}></div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex gap-2 lg:flex-col overflow-x-auto scrollbar-none'>
                                {data?.productImage?.map((imgURL) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                        <img 
                                            src={imgURL} 
                                            alt="Product detail" 
                                            className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' 
                                            onMouseEnter={() => handleMouseEnterProduct(imgURL)} 
                                            onClick={() => handleMouseEnterProduct(imgURL)} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                {loading ? (
                    <div className='flex flex-col gap-1 w-full'>
                        <p className='bg-slate-200 animate-pulse h-6 lg:h-8 rounded-full inline-block w-full'></p>
                        <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 animate-pulse w-full'></h2>
                        <p className='capitalize text-slate-400 bg-slate-200 min-w[100px] animate-pulse w-full'></p>
                        <div className='text-red-600 bg-slate-200 h-6 flex items-center gap-1'></div>
                        <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse'>
                            <p className='text-red-600 bg-slate-200'></p>
                            <p className='text-slate-400 line-through bg-slate-200'></p>
                        </div>
                        <div className='flex items-center gap-3 w-full lg:h-8'>
                            <button className='h-6 bg-slate-200 rounded animate-pulse '></button>
                            <button className='h-6 bg-slate-200 rounded animate-pulse'></button>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium my-1 w-full'></p>
                            <p></p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-1'>
                        <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                        <h2 className='text-2xl lg:text-4xl font-medium'>{data.productName}</h2>
                        <p className='capitalize text-slate-400'>{data.category}</p>
                        <div className='text-red-600 flex items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
                            <p className='text-red-600'>{displayINRCurrency(data.selling)}</p>
                            <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button 
                                className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' 
                                onClick={(e) => handleBuyProduct(e, data?._id)}
                            >Buy</button>
                            <button 
                                className='border-2 border-red-600 rounded px-3 min-w-[120px] py-1 text-white font-medium bg-red-600 hover:text-red-600 hover:bg-white' 
                                onClick={(e) => handleAddToCart(e, data._id)}
                            >Add to cart</button>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium my-1'>Descriptions :</p>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                )}
            </div>
            {data.category && (
                <CategoryWiseProductDisplay category={data?.category} heading={"Recommened Product"} />
            )}
        </div>
    );
};

export default ProductDetail;
