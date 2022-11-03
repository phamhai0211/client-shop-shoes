import * as actionStypes from '../constants/cartConstant'
import { CartService } from '../services/cartService';
import { toast } from 'react-toastify';

const getCart = (cart) => ({
    type: actionStypes.CART_GET_CART,
    payload: cart,

})

export const getCartAsync = () => (dispatch) => {
    CartService.getCartCustomer()
        .then(response => {
            console.log("response: ", response);
            dispatch(getCart(response.data));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//add product, update number product cart
const addProductCart = () => ({
    type: actionStypes.CART_ADD_PRODUCT,
})

export const addProductCartAsync = ({ productid, number }) => {
    return async function(dispatch) {     
        try{
            let response = (await CartService.addProductCart({ productid, number }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(addProductCart());
                dispatch(getCartAsync());
                toast.success("ADD CART SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                toast.error("PLEASE LOGIN")
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            toast.error(error.response.data)
            toast.error("PLEASE LOGIN")
            return{
                ok: false
            }
        }
    }
}


//delete product
const deleteProductCart = () => ({
    type: actionStypes.CART_DELETE_PRODUCT,
})

export const deleteProductCartAsync = (productid) => (dispatch) => {
        CartService.deleteProductCart(productid)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteProductCart());
            dispatch(getCartAsync());
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

//edit number product cart
// const editNumberProductCart = () => ({
//     type: actionStypes.CART_EDIT_NUMBER_PRODUCT,
// })

// export const editNumberProductCartAsync = ({productid, newnumber })  => {
//     return async function(dispatch) {     
//         try{
//             let response = (await CartService.editNumberProductCart({ productid, newnumber }) );
//             console.log("resposeeeeeeeeee: ",response);
//             // eslint-disable-next-line
//             if(response.status == 200){
//                 dispatch(editNumberProductCart());
//                 dispatch(getCartAsync());
//                 toast.success("EDIT NUMBER SUCCESS");
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

//add product, update number product cart
const editNumberProductCart = () => ({
    type: actionStypes.CART_ADD_PRODUCT,
})

export const editNumberProductCartAsync = ({ productid, number }) => {
    return async function(dispatch) {     
        try{
            let response = (await CartService.addProductCart({ productid, number }) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editNumberProductCart());
                dispatch(getCartAsync());
                //toast.success("UPDATE CART SUCCESS");
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
