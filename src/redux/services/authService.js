import apiClient from "../api/apiClient";

export const AuthService = {
    login:  ({ email, password }) => apiClient().post("api/auth/login", { email, password }),
    register:  (data) => apiClient().post("api/auth/register", data),
    findAccountByEmal: (email) => apiClient().get(`api/auth/email=${email}`)
}

