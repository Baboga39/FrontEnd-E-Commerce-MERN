import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productsCategory';
import VerticalCard from '../components/VerticalCard';
import SumaryApi from '../common';

const ProductCategory = () => {

  const params = useParams();
  const [data,setData] = useState([]);
  const location = useLocation()
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search)
  const urlCategorylistInArray = urlSearch.getAll("category")
  const urlCategoryListObject = {}
  urlCategorylistInArray.forEach(el=>{
    urlCategoryListObject[el]= true;
  })
  
  const [loading,setLoading] = useState(0);
  const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFillterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("")
  const fetchData = async()=>{
    const response = await fetch(SumaryApi.filterProduct.url,{
      method: SumaryApi.filterProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'category': params.category
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.result || []);
  }

  const handleSelectCategory =(e) =>{
    const {name,value,checked}= e.target;
    
    setSelectCategory((preve)=>{
      return {
        ...preve,
        [value] : checked
      }
    })    
  }
  useEffect(() =>{
    fetchData();
  },[filterCategoryList])
  useEffect(()=>{
    const arrayOfCategory = Object.keys(selectCategory).map(categoryName=>{
    if(selectCategory[categoryName])
    {
      return categoryName
    }
    return null;
    }).filter(el=>el )

    setFillterCategoryList(arrayOfCategory)

    // Format for url changes when on the checkbox
    const urlFormat = arrayOfCategory.map((el,index)=>{
      if((arrayOfCategory.length-1)===index){
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate("/product-category?"+ urlFormat.join(""))

  },[selectCategory])

  const handleOnChangeSortBy = (e)=>{

    const {value} = e.target
    setSortBy(value)
    if(value==="asc"){
      setData(preve => preve.sort((a,b)=> a.selling-b.selling))
    }
    if(value==="dsc"){
      setData(preve => preve.sort((a,b)=> b.selling-a.selling))
    }
  }
  useEffect(()=>{},[sortBy])

  return (
    <div className='container mx-auto px-4'>

    {/*Desktop version */}
    <div className='hidden lg:grid grid-cols-[200px,1fr]'>
    {/*left side */}
      <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-hidden'>

        {/*Sort by */}
        <div className=''> 
          <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

          <form className='text-sm flex flex-col gap-2 py-2'>
            <div className='flex items-center gap-3'>
              <input type='radio' checked={sortBy==='asc'} name='sortBy' value={"asc"} onChange={handleOnChangeSortBy}/>
              <label>Price - Low to High</label>
            </div>

            <div className='flex items-center gap-3'>
              <input type='radio' name='sortBy' checked={sortBy==='dsc'} value={"dsc"} onChange={handleOnChangeSortBy}/>
              <label>Price - High to Low </label>
            </div>


          </form>

        </div>

        {/*Filter By */}
        <div className=''> 
          <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

          <form className='text-sm flex flex-col gap-2 py-2'>

          {
            productCategory.map((categoryName, index)=>{
              return (
                <div className='flex items-center gap-3'>
                  <input type='checkbox' name='category' checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              )
            })
          }

          </form>

        </div>

      </div>
     {/*Right side */}
      <div className='px-4'>
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
      <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
      {
          data.length !==0 && (
            <VerticalCard data={data} loading={loading}/>
            )
      }
      </div>
      </div>
    </div>


    </div>

    


  )
}

export default ProductCategory
