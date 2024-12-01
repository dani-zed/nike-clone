import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProductSort({ onSort }) {
  return (
    <div className="relative">
      <Button variant="outline" size="sm">
        <ArrowUpDown className="w-4 h-4 mr-2" />
        Sort by
      </Button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-50"
          onClick={() => onSort('price-asc')}
        >
          Price: Low to High
        </button>
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-50"
          onClick={() => onSort('price-desc')}
        >
          Price: High to Low
        </button>
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-50"
          onClick={() => onSort('newest')}
        >
          Newest First
        </button>
      </div>
    </div>
  );
}