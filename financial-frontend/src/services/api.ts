import axios from 'axios';

const BASE_URL = 'http://localhost:8083';

export interface User {
  name: string;
  email: string;
  password: string;
  balance: number;
}

export interface LoginResponse {
  name: string;
  email: string;
  balance: number;
}

const api = {
  getUser: async (email: string) => {
    return axios.get(`${BASE_URL}/api/users/${email}`);
  },
  deposit: async (email: string, amount: number) => {
    return axios.post(`${BASE_URL}/api/users/${email}/deposit`, null, {
      params: { amount }
    });
  },
  withdraw: async (email: string, amount: number) => {
    return axios.post(`${BASE_URL}/api/users/${email}/withdraw`, null, {
      params: { amount }
    });
  },
  register: async (user: User): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data || 'Registration failed');
    }
  },
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data || 'Login failed';
      throw new Error(message);
    }
  },
};

export default api;