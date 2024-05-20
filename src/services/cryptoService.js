import axios from 'axios';

// Use Binance API URL
const API_URL = 'https://api.binance.com/api/v3';

const cache = new Map();

const getRealTimePrices = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/ticker/price`, {
      params: {
        symbol: symbol.toUpperCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    throw error;
  }
};

const getHistoricalData = async (symbol, interval) => {
  const cacheKey = `${symbol}-${interval}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get(`${API_URL}/klines`, {
      params: {
        symbol: symbol.toUpperCase(),
        interval: interval,
        limit: 1000,
      },
    });

    const data = response.data.map(item => ({
      time: item[0] / 1000, // Convert to seconds
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    }));

    // Ensure data is sorted by time
    data.sort((a, b) => a.time - b.time);

    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

const cryptoService = { getRealTimePrices, getHistoricalData };

export default cryptoService;
