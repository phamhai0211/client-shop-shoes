import * as actionStypes from '../constants/orderConstant';
import { OrderService } from '../services/orderService';
import { toast } from 'react-toastify';

const getListOrders = (orderList) => ({
    type: actionStypes.ORDER_GET_LIST,
    payload: orderList,

})

export const getListOrdersAsync = () => (dispatch) => {
        OrderService.getAllOrders()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListOrders(response.data));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create order
const createOrder = () => ({
    type: actionStypes.ORDER_CREATE_NEW,
})

export const createOrderAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await OrderService.createOrder(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createOrder());
                //dispatch(getListOrdersAsync());
                toast.success("ORDER SUCCESS");
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

//get single order
const getSingleOrder = (orderSingle) => ({
    type: actionStypes.ORDER_GET_SINGLE,
    payload: orderSingle,

})

// export const getSingleOrderAsync = (id) => (dispatch) => {
//         OrderService.getSingleOrder(id)
//         .then(response => {
//             //console.log("response: ", response);
//             //console.log("response dt: ", response.data);
//             dispatch(getSingleOrder(response.data));
          
            
//         })
//         .catch((error) => {
//             console.log("error: ",error);
    
//         });
// }

export const getSingleOrderAsync = (id)  => {
    return async function(dispatch) {     
        try{
            let response = (await OrderService.getSingleOrder(id));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(getSingleOrder(response.data));
                //toast.success("UPDATE SUCCESS");
                return {
                    ok: true,
                    status: response.data.status
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            //console.log("error.response: ", error.response);
            //toast.error("UPDATE FAIL")
            return{
                ok: false
            }
        }
    }
}

///.
//get  order by id user
const getOrdersCustomer = (ordersList) => ({
    type: actionStypes.ORDER_GET_BY_ID_CUSTOMER,
    payload: ordersList,

})


export const getOrdersCustomerAsync = (customerId)  => {
    return async function(dispatch) {     
        try{
            let response = (await OrderService.getOrdersByIdCUstomer(customerId));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(getOrdersCustomer(response.data));
                //toast.success("UPDATE SUCCESS");
                return {
                    ok: true,
                    //status: response.data.status
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            //console.log("error.response: ", error.response);
            //toast.error("UPDATE FAIL")
            return{
                ok: false
            }
        }
    }
}



// //get single orderDtail
// const getSingleOrderDetail = (orderSingleDetail) => ({
//     type: actionStypes.ORDER_GET_SINGLE_DETAIL,
//     payload: orderSingleDetail,

// })

// export const getSingleOrderDetailAsync = (id) => (dispatch) => {
//         OrderService.getDetailSingleOrder(id)
//         .then(response => {
//             //console.log("response: ", response);
//             //console.log("response dt: ", response.data);
//             dispatch(getSingleOrderDetail(response.data));
            
//         })
//         .catch((error) => {
//             console.log("error: ",error);
//         });
// }



// //delete order
// const deleteOrder = () => ({
//     type: actionStypes.ORDER_DELETE_BY_ID,
// })

// export const deleteOrderAsync = (orderId) => (dispatch) => {
//         OrderService.deleteOrder(orderId)
//         .then(response => {
//             console.log("response: ", response);
//             dispatch(deleteOrder());
//             dispatch(getListCategoriesAsync());
//             toast.success("DELETE SUCCESS");
//         })
//         .catch((error) => {
//             console.log("error.response: ", error.response);
//             // const errorList = Object.values(error.response.data.message);
//             // errorList.map((item) => {
//             //     toast.error(item);
//             // })
//             toast.error(error.response.data)
//         });
// }


//update status order 
const updateOrderStatus = () => ({
    type: actionStypes.ORDER_UPDATE_STATUS,
})

export const updateOrderStatusAsync = (id, status)  => {
    return async function(dispatch) {     
        try{
            let response = (await OrderService.updateStatus(id, status));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(updateOrderStatus());
                dispatch(getSingleOrderAsync(id));
                toast.success("UPDATE SUCCESS");
                return {
                    ok: true
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                
            } 
        }catch(error){
            //console.log("error.response: ", error.response);
            toast.error("UPDATE FAIL")
            return{
                ok: false
            }
        }
    }
}