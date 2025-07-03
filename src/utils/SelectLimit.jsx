import React, { useState } from 'react';
export default function SelectLimit({ totalpage, onPageSelect = () => {} }) {
  const [inputValue, setInputValue] = useState('');

  const handlePageSubmit = (e) => {
    if (e.key === 'Enter') {
      const value = Number(inputValue);
      if (value >= 1 && value <= totalpage) {
        onPageSelect(value);
        setInputValue('');
      } else {
        alert(`Please enter a number between 1 and ${totalpage}`);
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        min={1}
        max={totalpage}
        className="w-24 p-2 border border-gray-300 rounded bg-amber-50"
        placeholder="Page no"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handlePageSubmit}
      />
    </div>
  );
}
