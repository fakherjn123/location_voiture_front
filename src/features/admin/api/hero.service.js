import api from "../../../config/api.config";

export const getHeroImages = () => api.get("/hero");
export const addHeroImage = (formData) => api.post("/hero", formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateHeroImage = (id, data) => api.put(`/hero/${id}`, data);
export const deleteHeroImage = (id) => api.delete(`/hero/${id}`);
