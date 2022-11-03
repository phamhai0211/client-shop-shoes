import *  as actionTypes from '../constants/cartConstant';

const initialState = {
    cartCustomer: null,
    isLoading: true
}

function cartReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.CART_GET_CART:
            return{
                ...state,
                cartCustomer : action.payload,
                isLoading: false,
            }
        case actionTypes.CART_ADD_PRODUCT:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CART_DELETE_PRODUCT:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CART_EDIT_NUMBER_PRODUCT:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default cartReducers;