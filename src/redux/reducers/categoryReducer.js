import *  as actionTypes from '../constants/categoryConstant';

const initialState = {
    categoryList: null,
    categorySingle: null,
    //categoryListName: null,
    isLoading: true,
    errorMessage: null
}

function categoryReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.CATEGORY_GET_LIST:
            return{
                ...state,
                categoryList: action.payload,
                isLoading: false,
            }
        // case actionTypes.CATEGORY_GET_LIST_NAME:
        //     return{
        //         ...state,
        //         categoryListName: action.payload,
        //         isLoading: false,
        //     }
        case actionTypes.CATEGORY_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CATEGORY_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.CATEGORY_GET_SINGLE:
            return{
                ...state,
                categorySingle: action.payload,
                isLoading: false,
            }
        case actionTypes.CATEGORY_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default categoryReducers;