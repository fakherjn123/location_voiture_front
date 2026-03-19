import api from "../../../config/api.config";

export const getRecommendationService = () =>
  api.get("/recommendation");