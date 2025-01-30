import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const baseURL = "http://51.20.150.90:8001/api/"

const api = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Optional: Set a timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to check network connectivity
api.interceptors.request.use(
    async (config) => {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            return Promise.reject({ message: 'No internet connection' });
        }

        const token = ''; // Replace with your auth token logic
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Request interceptor (Optional: Add tokens or common headers)
// api.interceptors.request.use(
//     (config) => {
//         const token = 'your-auth-token'; // Replace with your auth token logic
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.message || 'Something went wrong');
        return Promise.reject(error);
    }
);

export default api;

