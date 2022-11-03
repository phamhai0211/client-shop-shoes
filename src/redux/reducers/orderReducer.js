import *  as actionTypes from '../constants/orderConstant';

const initialState = {
    orderList: null,
    orderSingle: null,
    isLoading: true,
    errorMessage: null,
    ordersOfUser: null
}

function orderReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.ORDER_GET_LIST:
            return{
                ...state,
                orderList: action.payload,
                isLoading: false,
            }
        case actionTypes.ORDER_GET_BY_ID_CUSTOMER:
            return{
                ...state,
                ordersOfUser: action.payload,
                isLoading: false,
            }
        
        case actionTypes.ORDER_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.ORDER_GET_SINGLE:
            return{
                ...state,
                orderSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.ORDER_UPDATE_STATUS:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default orderReducers;