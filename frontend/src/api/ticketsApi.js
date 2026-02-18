import axiosInstance from "./axiosInstance";

// Get all tickets
export const fetchTickets = async (params = {}) => {
  const response = await axiosInstance.get("/tickets/", { params });

  const data = response.data;

  // Handle paginated response
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;

  return [];
};

// Create ticket
export const createTicket = async (data) => {
  const response = await axiosInstance.post("/tickets/", data);
  return response.data;
};

// Update ticket
export const updateTicket = async (id, data) => {
  const response = await axiosInstance.patch(`/tickets/${id}/`, data);
  return response.data;
};

// Get stats
export const fetchStats = async () => {
  const response = await axiosInstance.get("/tickets/stats/");
  return response.data;
};

// Classify (LLM)
export const classifyTicket = async (description) => {
  const response = await axiosInstance.post("/tickets/classify/", {
    description,
  });
  return response.data;
};
