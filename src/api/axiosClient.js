import axios from 'axios';

// Create an axios instance with the base URL
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/ecommerce-v2', // This would be your real API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// This is important to prevent actual API calls during development
// We'll override axios methods to return mock data instead of making real HTTP requests
const originalRequest = axiosClient.request;
axiosClient.request = function(config) {
  console.log('Mock API Request:', { 
    method: config.method, 
    url: config.url,
    data: config.data,
    params: config.params
  });
  
  // Return a resolved promise with mock data
  // Real implementation would replace this with originalRequest(config)
  return Promise.resolve({
    data: { 
      success: true, 
      message: 'Mock response',
      mockData: true,
      endpoint: config.url
    }, 
    status: 200
  });
};

// Request interceptor for logging and debugging
axiosClient.interceptors.request.use(
  (config) => {
    // Simulated token retrieval
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Using token from storage');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
axiosClient.interceptors.response.use(
  (response) => {
    // Return just the data portion of the mock response
    return response.data;
  },
  (error) => {
    // Handle errors in mock mode
    console.error('Response error:', error);
    // Simulated unauthorized error handling
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, clearing storage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    return Promise.reject({
      response: {
        data: {
          message: 'Mock error response',
          details: error.message
        },
        status: error.response?.status || 500
      }
    });
  }
);

export default axiosClient; 