import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set a timeout of 10 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // Send cookies with requests
});


// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // If everything's OK, just pass the response as-is
    },
    (error) => {
         // If there's an error in the response
        // Handle specific error codes
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {

                // Unauthorized - redirect to login or show a message
                window.location.href = '/login'; // Redirect to login page
                console.error('Unauthorized access - redirecting to login');
            } 
            
            else if (status === 404) {
                // Not Found - show a message
                console.error('Resource not found');
            }

            else if (status === 500) {
                // Internal Server Error - show a message
                console.error('Server error - please try again later');
            }
            
            else if (error.code === 'ECONNABORTED') {
                // Request timeout - show a message
                console.error('Request timed out - please try again later');
            }
            else {
                console.error(`Error: ${data.message || 'An error occurred'}`);
            }
        }
        return Promise.reject(error);
    });

export default axiosInstance;
