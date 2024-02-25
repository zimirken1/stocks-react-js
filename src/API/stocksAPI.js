import axios from 'axios';

const API_KEY = 'cncvdlpr01qr85dt20j0cncvdlpr01qr85dt20jg';
const BASE_URL = 'https://finnhub.io/api/v1';

export const stocksApi = {
  getStocks: async () => {
    const response = await axios.get(`${BASE_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    return response.data;
  },
  getProfile: symbol => axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
  getPrice: symbol => axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`),
};
