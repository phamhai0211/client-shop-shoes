import apiClient from "../api/apiClient";

  
export const EmployeeService = {
    
    getAllEmployees: () => apiClient().get("employee/all"),
    createEmployee: (data) => apiClient().post("employee/register", data),
    //deleteEmployee: (employeeId) => apiClient().delete(`/employee/${employeeId}`),
    getSingleEmployee: (id) => apiClient().get(`/employee/${id}`),
    editEmployee: (data) => apiClient().put(`/employee/update`, data),
    editRoleEmployee: (data) => apiClient().put(`/api/auth/account`, data),
}