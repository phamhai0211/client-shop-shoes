import *  as actionTypes from '../constants/fragranceConstant';

const initialState = {
    fragranceList: null,
    fragranceSingle: null,
    //fragranceListName: null,
    isLoading: true,
    errorMessage: null
}

function fragranceReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.FRAGRANCE_GET_LIST:
            return{
                ...state,
                fragranceList: action.payload,
                isLoading: false,
            }
        // case actionTypes.FRAGRANCE_GET_LIST_NAME:
        //     return{
        //         ...state,
        //         fragranceListName: action.payload,
        //         isLoading: false,
        //     }
        case actionTypes.FRAGRANCE_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.FRAGRANCE_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.FRAGRANCE_GET_SINGLE:
            return{
                ...state,
                fragranceSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.FRAGRANCE_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default fragranceReducers;