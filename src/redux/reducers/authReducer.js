import *  as actionTypes from '../constants/authConstant';

const initialState = {
    // currentUser: {
    //     name: " ",
    //     image: " ",    
    // },
    // isLogin: false,
    isLoading: true,
    errorMessage: null,

    isLogin: false,
    token: '',
    currentUser: null
}

function authReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.AUTH_LOGIN:
            return{
                ...state,
                currentUser: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                currentUser: action.payload,
                isLogin: false,
                isLoading: false,
            }
           
        case actionTypes.AUTH_CHECK_LOGIN_RELOAD:
            return{
                ...state,
                currentUser: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case actionTypes.AUTH_REGISTER:
            return{
                ...state,
                isLoading: false,
            }
            
            case actionTypes.AUTH_GET_CURRENT_USER:
                return{
                    ...state,
                    currentUser: action.payload.currentUser,
                    isLoading: false
                }
            
            case actionTypes.AUTH_SET_TOKEN:
                return{
                    ...state,
                    token: action.payload,
                    isLoading: false
                }
      
        default:
            return state;
    }
}

export default authReducers;