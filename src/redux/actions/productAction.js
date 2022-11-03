import * as actionStypes from '../constants/productConstant';
import { ProductService } from '../services/productService';
import { toast } from 'react-toastify';

const getListProducts = (productList) => ({
    type: actionStypes.PRODUCT_GET_LIST,
    payload: productList,

})

export const getListProductsAsync = () => (dispatch) => {
        ProductService.getAllProducts()
        .then(response => {
            console.log(response);
            dispatch(getListProducts(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//get list product B
const getListProductsB = (productList) => ({
    type: actionStypes.PRODUCT_GET_LIST_B,
    payload: productList,

})

export const getListProductsBAsync = () => (dispatch) => {
        ProductService.getAllProductsB()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListProductsB(response.data));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}


//get list by id manufacture
const getProductByManufactureId = (productList) => ({
    type: actionStypes.PRODUCT_GET_LIST_BY_MANUFACTURE_ID,
    payload: productList,

})

export const getProductByManufactureIdAsync = (id) => (dispatch) => {
        ProductService.getProductByManufactureId(id)
        .then(response => {
            console.log("response: ", response);
            dispatch(getProductByManufactureId(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//get list by id category
const getProductByCategoryId = (productList) => ({
    type: actionStypes.PRODUCT_GET_LIST_BY_CATEGORY,
    payload: productList,

})

export const getProductByCategoryIdAsync = (id) => (dispatch) => {
        ProductService.getProductByCategory(id)
        .then(response => {
            console.log("response: ", response);
            dispatch(getProductByCategoryId(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create
const createProduct = () => ({
    type: actionStypes.PRODUCT_CREATE_NEW,
})

export const createProductAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await ProductService.createProduct(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createProduct());
                dispatch(getListProductsAsync());
                toast.success("CREATE SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            toast.error(error.response.data)
            return{
                ok: false
            }
        }
    }
}


// export const createProductAsync = ({ name, categoryId, manufactureId, idFragranceList, capacity, description, images }) => {
//     return async function(dispatch) {     
//         try{
//             let response = (await ProductService.createProduct({ name, categoryId, manufactureId, idFragranceList, capacity, description, images }) );
//             console.log("resposeeeeeeeeee: ",response);
//             // eslint-disable-next-line
//             if(response.status == 200){
//                 dispatch(createProduct());
//                 dispatch(getListProductsAsync());
//                 toast.success("CREATE SUCCESS");
//                 return {
//                     ok: true
//                 }
//             }
//             else{//call api not success not run in here
//                 console.log("response.eror: ", response.error);
                
//             } 
//         }catch(error){
//             console.log("error.response: ", error.response);
//             toast.error(error.response.data)
//             return{
//                 ok: false
//             }
//         }
//     }
// }

//get single 
const getSingleProduct = (productSingle) => ({
    type: actionStypes.PRODUCT_GET_SINGLE,
    payload: productSingle,

})

export const getSingleProductAsync = (id) => (dispatch) => {
        ProductService.getSingleProduct(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleProduct(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



//delete 
const deleteProduct = () => ({
    type: actionStypes.PRODUCT_DELETE_BY_ID,
})

export const deleteProductAsync = (manufactureId) => (dispatch) => {
        ProductService.deleteProduct(manufactureId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteProduct());
            dispatch(getListProductsAsync());
            toast.success("DELETE SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            // const errorList = Object.values(error.response.data.message);
            // errorList.map((item) => {
            //     toast.error(item);
            // })
            toast.error(error.response.data)
        });
}


//edit Product
const editProduct = () => ({
    type: actionStypes.PRODUCT_EDIT_BY_ID,
})

export const editProductAsync = (id,data)  => {
    return async function(dispatch) {     
        try{
            let response = (await ProductService.editProduct(id,data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editProduct());
                dispatch(getListProductsAsync());
                toast.success("EDIT SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            toast.error(error.response.data)
            return{
                ok: false
            }
        }
    }
      

}

//get images
const getImagesProduct = (images) => ({
    type: actionStypes.PRODUCT_GET_IMAGES,
    payload: images

})

export const getImagesProductAsync = (id) => (dispatch) => {
    ProductService.getImagesProduct(id)
    .then(response => {
        //console.log("response: ", response);
        //console.log("response dt: ", response.data);
        dispatch(getImagesProduct(response.data));
        
    })
    .catch((error) => {
        console.log("error: ",error);
    });
}