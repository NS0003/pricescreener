import React from 'react';
import './RangeSwitcher.css';

const RangeSwitcher = ({ onChange }) => {
  return (
    <div className="range-switcher">
      <button onClick={() => onChange('1m')}>1m</button>
      <button onClick={() => onChange('5m')}>5m</button>
      <button onClick={() => onChange('15m')}>15m</button>
      <button onClick={() => onChange('1h')}>1h</button>
      <button onClick={() => onChange('4h')}>4h</button>
      <button onClick={() => onChange('1d')}>1d</button>
    </div>
  );
};

export default RangeSwitcher;
