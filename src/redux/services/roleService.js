import apiClient from "../api/apiClient";

export const RoleService = {
    getAllRoles: () => apiClient().get("role/"),
}