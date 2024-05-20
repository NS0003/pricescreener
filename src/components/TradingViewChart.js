import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const TradingViewChart = ({ data }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candleSeriesRef = useRef();
  const [chart, setChart] = useState(null);
  const [candleSeries, setCandleSeries] = useState(null);

  useEffect(() => {
    if (!chartRef.current) {
      const newChart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        layout: {
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        },
        grid: {
          vertLines: {
            color: '#e1e1e1',
          },
          horzLines: {
            color: '#e1e1e1',
          },
        },
        priceScale: {
          borderColor: '#cccccc',
        },
        timeScale: {
          borderColor: '#cccccc',
        },
      });
      const newCandleSeries = newChart.addCandlestickSeries();
      setChart(newChart);
      setCandleSeries(newCandleSeries);
      chartRef.current = newChart;
      candleSeriesRef.current = newCandleSeries;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(data);
    }
  }, [data]);

  const resizeChart = () => {
    if (chartRef.current) {
      chartRef.current.resize(chartContainerRef.current.clientWidth, 600);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => window.removeEventListener('resize', resizeChart);
  }, []);

  return <div ref={chartContainerRef} style={{ position: 'relative' }} />;
};

export default TradingViewChart;
