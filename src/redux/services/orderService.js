import apiClient from "../api/apiClient";

export const OrderService = {
    getAllOrders: () => apiClient().get("/api/order/all"),
    createOrder: (data) => apiClient().post("/api/order/", data), //nameCustomer, address, phoneNumber
    getSingleOrder: (id) => apiClient().get(`/api/order/${id}`),
    updateStatus: (id,status) => apiClient().put(`/api/order/change?orderId=${id}&status=${status}`),
    getOrdersByIdCUstomer: (customerId) => apiClient().get(`/api/order/all-by-customer-id?customerId=${customerId}`)
}