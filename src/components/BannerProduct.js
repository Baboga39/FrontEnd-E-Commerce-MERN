import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


import image1 from '../assest/banner/img1.webp' 
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobie from '../assest/banner/img1_mobile.jpg'
import image2Mobie from '../assest/banner/img2_mobile.webp'
import image3Mobie from '../assest/banner/img3_mobile.jpg'
import image4Mobie from '../assest/banner/img4_mobile.jpg'
import image5Mobie from '../assest/banner/img5_mobile.png'
import { current } from '@reduxjs/toolkit'

const BannerProduct = () => {

  const [currentImage,setCurrentImage] = useState(0)

  const desktopImages=[
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  const mobieImages = [
    image1Mobie,
    image2Mobie,
    image3Mobie,
    image4Mobie,
    image5Mobie,
  ]


  const nextImage = () =>{
    if(desktopImages.length -1   > currentImage){
      setCurrentImage(preve => preve +1)
    }
  }

  const preveImage = () =>{
    if( currentImage !==0){
      setCurrentImage(preve => preve -1)
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);
  

  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'> 
          <div className='absolute z-10 h-full w-full flex items-center'>
            <div className='flex justify-between w-full text-2xl'>
              <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'> <FaAngleLeft/></button>
              <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'> <FaAngleRight/></button> 
            </div>
          </div>

          {/*Desktop & Tablet Version */}
          <div className='hidden md:flex h-full w-full overflow-hidden'>
          {
            desktopImages.map((imageUrl,index)=>{
              return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translateX(-${currentImage*100}%)`}}>
                <img src={imageUrl} alt='banner' className='w-full h-full' />
                </div>
              )
            })
          }
          </div>

          {/*Mobile  Version */}
          <div className='flex h-full w-full overflow-hidden md:hidden'>
          {
            mobieImages.map((imageUrl,index)=>{
              return (
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translateX(-${currentImage*100}%)`}}>
                <img src={imageUrl} alt='banner' className='w-full h-full object-cover' />
                </div>
              )
            })
          }
          </div>



        </div>
    </div>
  )
}

export default BannerProduct
