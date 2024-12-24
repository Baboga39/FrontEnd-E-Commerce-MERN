import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productsCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SumaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onclose,
    fetchData
}) => {
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",    
        price: "",
        selling: "",
    });

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadProductImage = await uploadImage(file);

        setData(prevData => ({
            ...prevData,
            productImage: [...prevData.productImage, uploadProductImage.url],
        }));
    };

    const handleDeleteProductImage = async(index) =>{
        const newProductImage = [...data.productImage]

        newProductImage.splice(index,1)
        setData(prevData => ({
            ...prevData,
            productImage: [...newProductImage],
        }));
    }

    /*Handle upload product*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(SumaryApi.uploadProduct.url,
            {
                method: SumaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )

        const responseData = await response.json();

        if(responseData.success){
            toast.success(responseData.message);
            setData({
                productName: "",
                brandName: "",
                category: "",
                productImage: [],
                description: "",    
                price: "",
                selling: "",
            });
            onclose()
            fetchData()
        }else{
            toast.error(responseData.message);
        }
    }

    return (
        <div className='fixed bg-slate-500 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden'> 

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onclose}>
                        <IoClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name: </label>
                    <input 
                        type='text' 
                        id='productName'
                        placeholder='Enter product name' 
                        value={data.productName} 
                        name='productName'
                        onChange={handleOnchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor='brandName'>Brand Name: </label>
                    <input 
                        type='text' 
                        id='brandName'
                        name='brandName'
                        placeholder='Enter brand name' 
                        value={data.brandName} 
                        onChange={handleOnchange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category'>Category: </label>
                    <select
                        value={data.category}
                        name='category'
                        required
                        onChange={handleOnchange}
                        className='p-2 bg-slate-100 border rounded'
                    >
                        <option value={""} >Select category</option>
                        {productCategory.map((item, index) => (

                            <option value={item.value} key={item.value+index}>{item.label}</option>

                        ))}
                    </select>

                    <label htmlFor='productImage'>Product Image: </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>   
                                <p className='text-sm'>Upload Product Image</p> 
                                <input type='file' id='uploadImageInput' onChange={handleUploadProduct} className='hidden'/>
                            </div>    
                        </div>
                    </label>

                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img 
                                            src={el} 
                                            alt='product' 
                                            width={80} 
                                            height={80} 
                                            className='bg-slate-100 border ml-2' 
                                            onClick={() => {
                                                setOpenFullScreen(true);
                                                setFullScreenImage(el);
                                            }}
                                        />
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block'onClick={()=>handleDeleteProductImage(index)}>
                                    <MdDelete />
                                    </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-500 text-xs'>* Please upload product image</p>
                        )}
                    </div>
                    <label htmlFor='price' className='mt-3'>Price: </label>
                    <input 
                        type='number' 
                        id='price'
                        name='price'
                        required
                        placeholder='Enter price ' 
                        value={data.price} 
                        onChange={handleOnchange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    <label htmlFor='selling' className='mt-3'>Selling Price: </label>
                    <input 
                        type='number' 
                        id='selling'
                        name='selling'
                        required
                        placeholder='Enter selling ' 
                        value={data.selling} 
                        onChange={handleOnchange}
                        className='p-2 bg-slate-100 border rounded'
                    />

                    <label htmlFor='description' className='mt-3'>Description : </label>
                    <textarea 
                        className='h-28 bg-slate-100' 
                        placeholder='Product description'
                        rows={3} cols={5} 
                        onChange={handleOnchange} 
                        value={data.description}
                        name='description'>

                    </textarea>

                    <button className='px-2 py-1 bg-red-600 text-white mb-5 hover:bg-red-700'>Upload Product</button>
                </form>
            </div>

            {/* Display Image Full Screen */}
            {openFullScreen && (
                <DisplayImage onClose={() => setOpenFullScreen(false)} imgUrl={fullScreenImage}/>
            )}
        </div>
    );
};

export default UploadProduct;
