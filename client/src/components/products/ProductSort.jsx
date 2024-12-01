
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProductSort({ onSort }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSort = (sortType) => {
    onSort(sortType);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDropdown}
      >
        <ArrowUpDown className="w-4 h-4 mr-2" />
        Sort by
      </Button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50"
            onClick={() => handleSort('price-asc')}
          >
            Price: Low to High
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50"
            onClick={() => handleSort('price-desc')}
          >
            Price: High to Low
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50"
            onClick={() => handleSort('newest')}
          >
            Newest First
          </button>
        </div>
      )}
    </div>
  );
}
