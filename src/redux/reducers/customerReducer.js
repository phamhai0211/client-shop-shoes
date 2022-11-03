import *  as actionTypes from '../constants/customerConstant';

const initialState = {
    customerList: null,
    customerSingle: null,
    //customerListName: null,
    isLoading: true,
    errorMessage: null,
    //images: null
}

function customerReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.CUSTOMER_GET_LIST:
            return{
                ...state,
                customerList: action.payload,
                isLoading: false,
            }
        case actionTypes.CUSTOMER_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CUSTOMER_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CUSTOMER_GET_SINGLE:
            return{
                ...state,
                customerSingle: action.payload,
                isLoading: false,
            }
            case actionTypes.CUSTOMER_GET_BY_EMAIL:
                return{
                    ...state,
                    customerSingle: action.payload,
                    isLoading: false,
                }
        case actionTypes.CUSTOMER_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
            case actionTypes.CUSTOMER_EDIT_ROLE_BY_ID:
                return{
                    ...state,
                    isLoading: false,
                }
        default:
            return state;
    }
}

export default customerReducers;