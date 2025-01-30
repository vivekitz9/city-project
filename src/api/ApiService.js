
import api from "./api";
const ApiService = {
    // Fetching data
    fetchData: (endpoint) => api.get(endpoint),

    // Posting data
    postData: (endpoint, data) => api.post(endpoint, data),

    //  Updating data
    updateData: (endpoint, data) => api.put(endpoint, data),

    // Deleting data
    deleteData: (endpoint) => api.delete(endpoint),
};

export default ApiService;