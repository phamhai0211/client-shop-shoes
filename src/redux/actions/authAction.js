import * as actionTypes from '../constants/authConstant';
import  { AuthService } from '../services/authService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

const login = (userCurrent) => ({
    type: actionTypes.AUTH_LOGIN,
    payload: userCurrent,

})

export function actSetToken(token) {
    return {
      type: actionTypes.AUTH_SET_TOKEN,
      payload: token
    }
  }

export const loginAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await AuthService.login(data) );
            console.log("respon Login :",response)
            console.log("response.data.data Login :",response.data)
            if(response.status === 200){
                dispatch(login(response.data));
                dispatch(actSetToken(response.data.token))
                toast.success("Đăng nhập thành công!");
                // localStorage.setItem("userCurrentId",response.data.data.id)
                // localStorage.setItem("isLogin",true)
                // if(response.data.data.cart){
                //     localStorage.setItem("cart",response.data.data.cart)
                // }else{
                //     localStorage.setItem("cart",JSON.stringify([]))
                // }
                
                return {
                    ok: true,
                    currentUser: response.data
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response);
                // toast.success(response.error);
            } 
        }catch(error){
            console.log("error.response: ", error);
            // const errorList = Object.values(error.response.data.message);
            // if(errorList.length > 0){
            //     errorList.map((item) => {
            //         toast.error(item);
            //     })
            // }
            toast.error("Sai thông tin đăng nhập!");
            //console.log("status aciton ", error.response); //404..
            return{
                ok: false
            }
        }
    }
}

//register (create customer)
const register = () => ({
    type: actionTypes.AUTH_REGISTER,
})

export const registerAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await AuthService.register(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(register());
                //dispatch(getListEmployeesAsync());
                toast.success("REGISTER SUCCESS");
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

//log out
// export const logout = () => ( {
//     type: actionTypes.AUTH_LOGOUT,
//     payload: {
//         name: " ",
//         image: " ",
//         id: " "    
//     },

// })

export const logout = () => ( {
    type: actionTypes.AUTH_LOGOUT,
    payload: {
        token: Cookies.get('X-Auth-Token'),
        type: "Bearer",
        email: " ",
        roles: []   
    },

})



//
const loginCheckLocal = (userCurrent) => ({
    type: actionTypes.AUTH_CHECK_LOGIN_RELOAD,
    payload: userCurrent,

})

export const loginCheckLocalAsync = () => {
    return async function(dispatch) { 
        const decoded = jwt_decode(Cookies.get('X-Auth-Token'));    
        try{
            let response = (await AuthService.findAccountByEmal(decoded.sub));
            //dispatch(loginCheckLocal())
            console.log("response : xx",response)
            console.log("response.data : xx",response.data)
            if(response.status === 200){
                const curr = {
                    token: Cookies.get('X-Auth-Token'),
                    type: "Bearer",
                    email: response.data.email,
                    roles: [response.data.role.name]
                }
                dispatch(loginCheckLocal(curr));
                //toast.success("Đăng nhập thành công!");
                return {
                    ok: true,
                    //userCurrent: response.data.data
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: xx", response.error);
                // toast.success(response.error);
            } 
        }catch(error){
            console.log("error.response: xx", error.response);
            // const errorList = Object.values(error.response.data.message);
            // if(errorList.length > 0){
            //     errorList.map((item) => {
            //         toast.error(item);
            //     })
            // }
            toast.error("Oh có chút vấn đề! Bạn vui lòng đăng nhập lại nhé");
           // console.log("status aciton ", error.response.status); //404..
            return{
                ok: false
            }
        }
    }
}

// const loginCheckLocal = (userCurrent) => ({
//     type: actionTypes.AUTH_CHECK_LOGIN_RELOAD,
//     payload: userCurrent,

// })

// export const loginCheckLocalAsync = (token) => {
//     return async function(dispatch) {     
//         try{
//             let response = (await UserService.getSingleUser(idInLocal));
//             console.log("respon Login : xx",response)
//             console.log("response.data.data Login : xx",response.data.data)
//             if(response.data.success == true || response.status === 200 || response.status === 201){
//                 dispatch(loginCheckLocal(response.data.data));
//                 //toast.success("Đăng nhập thành công!");
//                 localStorage.setItem("userCurrentId",response.data.data.id)
//                 localStorage.setItem("isLogin",true)
//                 // localStorage.setItem("cart",JSON.stringify(response.data.data.cart))
//                 return {
//                     ok: true,
//                     userCurrent: response.data.data
//                 }
//             }
//             else{//call api not success not run in here
//                 console.log("response.eror: xx", response.error);
//                 // toast.success(response.error);
//             } 
//         }catch(error){
//             console.log("error.response: xx", error.response);
//             // const errorList = Object.values(error.response.data.message);
//             // if(errorList.length > 0){
//             //     errorList.map((item) => {
//             //         toast.error(item);
//             //     })
//             // }
//             toast.error("Oh có chút vấn đề! Bạn vui lòng đăng nhập lại nhé");
//            // console.log("status aciton ", error.response.status); //404..
//             return{
//                 ok: false
//             }
//         }
//     }
// }