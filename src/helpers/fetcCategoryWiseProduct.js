const {default: SummaryApi} = require("../common")

const fetchCategoryWiseProduct = async (category) =>{
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: SummaryApi.categoryWiseProduct.method,
        credentials: 'include',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({category: category})
    })
    const dataResponse = await response.json()

    return dataResponse
}

module.exports = fetchCategoryWiseProduct;