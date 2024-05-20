import React, { useState, useEffect, useCallback } from 'react';
import cryptoService from './services/cryptoService';
import TradingViewChart from './components/TradingViewChart';
import RangeSwitcher from './components/RangeSwitcher';
import { debounce } from './utils/debounce';
import './App.css';

const App = () => {
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState([]);
  const [asset, setAsset] = useState({ id: 'BTCUSDT', name: 'Bitcoin', symbol: 'BTC' });
  const [error, setError] = useState(null);

  const fetchChartData = useCallback(
    debounce(async (selectedTimeframe, selectedAsset) => {
      try {
        const data = await cryptoService.getHistoricalData(selectedAsset.id, selectedTimeframe);
        setChartData(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching historical data.');
        console.error(error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchChartData(timeframe, asset);
  }, [timeframe, asset, fetchChartData]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          {asset.name} ({asset.symbol.toUpperCase()}) - <span className="timeframe-indicator">{timeframe.toUpperCase()}</span>
        </h1>
      </header>
      <RangeSwitcher onChange={setTimeframe} />
      {error ? <p>{error}</p> : <TradingViewChart data={chartData} />}
    </div>
  );
};

export default App;
