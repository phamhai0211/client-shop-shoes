import apiClient from "../api/apiClient";

export const FragranceService = {
    getAllFragrances: () => apiClient().get("fragrance/"),
    createFragrance: ({ name, description }) => apiClient().post("fragrance/", { name, description }),
    deleteFragrance: (fragranceId) => apiClient().delete(`/fragrance/${fragranceId}`),
    getSingleFragrance: (fragranceId) => apiClient().get(`/fragrance/${fragranceId}`),
    editFragrance: ({id, name, description }) => apiClient().put(`/fragrance/${id}`, {id, name, description }),
}