import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types";
import { FILTER_PRODUCTS_BY_SIZE } from "../types";


export const fetchProducts = () => async(dispatch) => {

    const res = await fetch("/api/products");
    const data = await res.json(); //returns promise, so await

    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });

};

export const filterProducts = (products, size) => (dispatch)=>{
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size === "" ? products:
            products.filter(x=> x.availableSizes.indexOf(size) >= 0),
        },
    });
};

export const sortProducts = (filteredProducts, sort) => dispatch =>{
    const sortedProducts = filteredProducts.slice(); //clone copy of filtered products

    if(sort === "latest") { //if latest, sort by id, else sort by price
        sortedProducts.sort((a,b) => (a._id > b._id ? 1 : -1));
    } else {
        sortedProducts.sort((a,b) => (
            sort === "lowest" ? a.price > b.price ? 1: -1
            :
            a.price > b.price ? -1 : 1 //highest to lowest
        ))
    }

    dispatch(
        {
            type: ORDER_PRODUCTS_BY_PRICE,
            payload: {
                sort: sort,
                items: sortedProducts
            }
        }
    )
}
