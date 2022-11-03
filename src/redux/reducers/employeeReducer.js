import *  as actionTypes from '../constants/employeeConstant';

const initialState = {
    employeeList: null,
    employeeSingle: null,
    //employeeListName: null,
    isLoading: true,
    errorMessage: null,
    //images: null
}

function employeeReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.EMPLOYEE_GET_LIST:
            return{
                ...state,
                employeeList: action.payload,
                isLoading: false,
            }
        case actionTypes.EMPLOYEE_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.EMPLOYEE_CREATE_NEW:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.EMPLOYEE_GET_SINGLE:
            return{
                ...state,
                employeeSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.EMPLOYEE_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
            case actionTypes.EMPLOYEE_EDIT_ROLE_BY_ID:
                return{
                    ...state,
                    isLoading: false,
                }
        default:
            return state;
    }
}

export default employeeReducers;