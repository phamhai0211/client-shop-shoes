import apiClient from "../api/apiClient";

  
export const CartService = {
    
    getCartCustomer: () => apiClient().get("/api/cart/all"),
    addProductCart: (data) => apiClient().post("/api/cart/add", data), //{productid, number}
    deleteProductCart: (productid) => apiClient().delete(`/api/cart/delete?productid=${productid}`),
    editNumberProductCart: (data) => apiClient().put(`/api/cart/edit-number`, data),//{product, newnumber}
    // editRoleCustomer: (data) => apiClient().put(`/api/auth/account`, data),
}