import * as actionStypes from '../constants/employeeConstant';
import { EmployeeService } from '../services/employeeService';
import { toast } from 'react-toastify';

const getListEmployees = (employeesList) => ({
    type: actionStypes.EMPLOYEE_GET_LIST,
    payload: employeesList,

})

export const getListEmployeesAsync = () => (dispatch) => {
        EmployeeService.getAllEmployees()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListEmployees(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create 
const createEmployee = () => ({
    type: actionStypes.EMPLOYEE_CREATE_NEW,
})

export const createEmployeeAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await EmployeeService.createEmployee(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(createEmployee());
                dispatch(getListEmployeesAsync());
                toast.success("CREATE SUCCESS");
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

//get single 
const getSingleEmployee = (employeeSingle) => ({
    type: actionStypes.EMPLOYEE_GET_SINGLE,
    payload: employeeSingle,

})

export const getSingleEmployeeAsync = (id) => (dispatch) => {
        EmployeeService.getSingleEmployee(id)
        .then(response => {
            //console.log("response: ", response);
            //console.log("response dt: ", response.data);
            dispatch(getSingleEmployee(response.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}



//delete 
// const deleteEmployee = () => ({
//     type: actionStypes.EMPLOYEE_DELETE_BY_ID,
// })

// export const deleteEmployeeAsync = (employeeId) => (dispatch) => {
//         EmployeeService.deleteEmployee(employeeId)
//         .then(response => {
//             console.log("response: ", response);
//             dispatch(deleteEmployee());
//             dispatch(getListEmployeesAsync());
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


//edit 
const editEmployee = () => ({
    type: actionStypes.EMPLOYEE_EDIT_BY_ID,
})

export const editEmployeeAsync = (data)  => {
    return async function(dispatch) {     
        try{
            let response = (await EmployeeService.editEmployee(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editEmployee());
                dispatch(getListEmployeesAsync());
                toast.success("EDIT SUCCESS");
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

//edit  role
const editRoleEmployee = () => ({
    type: actionStypes.EMPLOYEE_EDIT_ROLE_BY_ID,
})

export const editRoleEmployeeAsync = (data)  => {
    return async function(dispatch) {     
        try{
            let response = (await EmployeeService.editRoleEmployee(data) );
            console.log("resposeeeeeeeeee: ",response);
            // eslint-disable-next-line
            if(response.status == 200){
                dispatch(editEmployee());
                dispatch(editRoleEmployee());
                toast.success("EDIT SUCCESS");
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