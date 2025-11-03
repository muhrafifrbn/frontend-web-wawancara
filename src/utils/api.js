/* eslint-disable no-undef */
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`);
        const newToken = response.data.token;
        
        if (newToken) {
          // Update cookie
          Cookies.set('auth_token', newToken, { 
            expires: 7, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          // Update auth header and retry request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        Cookies.remove('auth_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const get = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
};

export const post = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};

export const put = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response;
  } catch (error) {
    console.error('Error in PUT request:', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response;
  } catch (error) {
    console.error('Error in DELETE request:', error);
    throw error;
  }
};

export default apiClient;