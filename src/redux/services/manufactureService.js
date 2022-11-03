import apiClient from "../api/apiClient";

export const ManufactureService = {
    getAllManufactures: () => apiClient().get("manufacture/"),
    createManufacture: ({ name, email, phone, address, description }) => apiClient().post("manufacture/", { name, email, phone, address, description }),
    deleteManufacture: (manufactureId) => apiClient().delete(`/manufacture/${manufactureId}`),
    getSingleManufacture: (manufactureId) => apiClient().get(`/manufacture/${manufactureId}`),
    editManufacture: ({ id, name, email, phone, address, description }) => apiClient().put(`/manufacture/${id}`, { id, name, email, phone, address, description }),
}