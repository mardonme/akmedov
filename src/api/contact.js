import { apiClient } from "./client";

export const submitContactForm = (formData) =>
  apiClient.post("/message/submit", formData);
