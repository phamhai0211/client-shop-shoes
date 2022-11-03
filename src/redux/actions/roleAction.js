import * as actionStypes from '../constants/roleConstant';
import { RoleService } from '../services/roleService';
//import { toast } from 'react-toastify';

const getListRoles = (roleList) => ({
    type: actionStypes.ROLE_GET_LIST,
    payload: roleList,

})

export const getListRolesAsync = () => (dispatch) => {
        RoleService.getAllRoles()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListRoles(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}
      