import * as actionStypes from '../constants/customerConstant';
import { CustomerService } from '../services/customerService';
import { toast } from 'react-toastify';

const getListCustomers = (customersList) => ({
    type: actionStypes.CUSTOMER_GET_LIST,
    payload: customersList,

})

export const getListCustomersAsync = () => (dispatch) => {
        CustomerService.getAllCustomers()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListCustomers(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//get by email
const getCustomerByEmail = (customerSingle) => ({
    type: actionStypes.CUSTOMER_GET_BY_EMAIL,
    payload: customerSingle,

})

export const getCustomerByEmailAsync = (email) => (dispatch) => {
        CustomerService.getSingleCustomer(email)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getCustomerByEmail(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

export const getCustomerByEmailAsyncB = (email)  => {
    return async function(dispatch) {     
        try{
            let response = (await CustomerService.getSingleCustomer(email));
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(getCustomerByEmail(response.data));
                //toast.success("UPDATE SUCCESS");
                return {
                    ok: true,
                    customerId: response.data.id
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

// //create 
// const createCustomer = () => ({
//     type: actionStypes.CUSTOMER_CREATE_NEW,
// })

// export const createCustomerAsync = (data) => {
//     return async function(dispatch) {     
//         try{
//             let response = (await CustomerService.createCustomer(data) );
//             console.log("resposeeeeeeeeee: ",response);
//             // eslint-disable-next-line
//             if(response.status == 200){
//                 dispatch(createCustomer());
//                 dispatch(getListCustomersAsync());
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

// //get single 
// const getSingleCustomer = (customerSingle) => ({
//     type: actionStypes.CUSTOMER_GET_SINGLE,
//     payload: customerSingle,

// })

// export const getSingleCustomerAsync = (id) => (dispatch) => {
//         CustomerService.getSingleCustomer(id)
//         .then(response => {
//             //console.log("response: ", response);
//             //console.log("response dt: ", response.data);
//             dispatch(getSingleCustomer(response.data));
            
//         })
//         .catch((error) => {
//             console.log("error: ",error);
//         });
// }



// //delete 
// // const deleteCustomer = () => ({
// //     type: actionStypes.CUSTOMER_DELETE_BY_ID,
// // })

// // export const deleteCustomerAsync = (customerId) => (dispatch) => {
// //         CustomerService.deleteCustomer(customerId)
// //         .then(response => {
// //             console.log("response: ", response);
// //             dispatch(deleteCustomer());
// //             dispatch(getListCustomersAsync());
// //             toast.success("DELETE SUCCESS");
// //         })
// //         .catch((error) => {
// //             console.log("error.response: ", error.response);
// //             // const errorList = Object.values(error.response.data.message);
// //             // errorList.map((item) => {
// //             //     toast.error(item);
// //             // })
// //             toast.error(error.response.data)
// //         });
// // }


// //edit 
// const editCustomer = () => ({
//     type: actionStypes.CUSTOMER_EDIT_BY_ID,
// })

// export const editCustomerAsync = (data)  => {
//     return async function(dispatch) {     
//         try{
//             let response = (await CustomerService.editCustomer(data) );
//             console.log("resposeeeeeeeeee: ",response);
//             // eslint-disable-next-line
//             if(response.status == 200){
//                 dispatch(editCustomer());
//                 dispatch(getListCustomersAsync());
//                 toast.success("EDIT SUCCESS");
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

// //edit  role
// const editRoleCustomer = () => ({
//     type: actionStypes.CUSTOMER_EDIT_ROLE_BY_ID,
// })

// export const editRoleCustomerAsync = (data)  => {
//     return async function(dispatch) {     
//         try{
//             let response = (await CustomerService.editRoleCustomer(data) );
//             console.log("resposeeeeeeeeee: ",response);
//             // eslint-disable-next-line
//             if(response.status == 200){
//                 dispatch(editCustomer());
//                 dispatch(editRoleCustomer());
//                 toast.success("EDIT SUCCESS");
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