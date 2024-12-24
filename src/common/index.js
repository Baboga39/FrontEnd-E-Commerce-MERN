const backendDomain = 'https://backend-e-commerce-mern.onrender.com/api/v1'

const SumaryApi = {
    signUp: {
        url: `${backendDomain}/auth/sign-up`,
        method: 'POST'
    },
    signIn:{
        url: `${backendDomain}/auth/sign-in`,
        method: 'POST'
    },
    current_user:{
        url: `${backendDomain}/auth/user-details`,
        method: 'GET'
    },
    logout:{
        url: `${backendDomain}/auth/logout`,
        method: 'GET'
    },
    allUser:{
        url: `${backendDomain}/admin/allUsers`,
        method: 'GET'
    },
    updateUser:{
        url: `${backendDomain}/admin/updateUser`,
        method: 'PUT'
    },
    uploadProduct:{
        url: `${backendDomain}/admin/uploadProduct`,
        method: 'POST'
    },
    allProduct:{
        url: `${backendDomain}/admin/allProduct`,
        method: 'GET'
    },
    updateProduct:{
        url: `${backendDomain}/admin/updateProduct`,
        method: 'PUT'
    },
    categoryProduct:{
        url: `${backendDomain}/admin/allCategories`,
        method: 'GET'
    },
    categoryWiseProduct:{
        url: `${backendDomain}/user/category-product`,
        method: 'POST'
    },
    productDetail:{
        url: `${backendDomain}/product/product-details`,
        method: 'POST'
    },
    addToCartProduct:{
        url: `${backendDomain}/user/addToCart`,
        method: 'POST'
    },
    countAddToCartProduct:{
        url: `${backendDomain}/user/countAddToCart`,
        method: 'GET'
    },
    cartProduct:{
        url: `${backendDomain}/user/cartProduct`,
        method: 'GET'
    },
    updateCartProduct:{
        url: `${backendDomain}/user/updateCartProduct`,
        method: 'POSt'
    },
    deleteCartProduct:{
        url: `${backendDomain}/user/deleteCartProduct`,
        method: 'DELETE'
    },
    searchProduct:{
        url: `${backendDomain}/product/searchProduct`,
        method: 'POST'
    },
    filterProduct:{
        url: `${backendDomain}/product/filterProduct`,
        method: 'POST'
    }
}

export default SumaryApi;