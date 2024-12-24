import { toast } from "react-toastify";
import SumaryApi from "../common";

const addToCart = async(e,id)=>{
    e.stopPropagation();
    e.preventDefault();

    console.log(id)
    const response = await fetch(SumaryApi.addToCartProduct.url,{
        method: SumaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId: id}),
    })

    const responseData = await response.json();

    if(responseData.success) {
        toast.success(responseData.message);
    }
    else {
        toast.error(responseData.message);
    }
    return responseData;
}
export default addToCart