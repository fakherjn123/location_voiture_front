import api from "../../../config/api.config";

export const rentCar = (data) =>
  api.post("/rentals", data);

export const getMyRentals = () =>
  api.get("/rentals/my");

// URL corrigée: était /rentals/${id}/confirm
export const cancelRental = (id) =>
  api.put(`/rentals/cancel/${id}`);
