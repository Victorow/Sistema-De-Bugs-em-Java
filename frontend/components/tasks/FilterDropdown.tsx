// components/tasks/FilterDropdown.tsx
'use client';

import { useState } from 'react';
import { Filter, ChevronDown, CheckCircle, Clock, AlertCircle, XCircle, List } from 'lucide-react';

interface FilterDropdownProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions = [
  { value: 'all', label: 'Todas', icon: List, count: 0 },
  { value: 'pending', label: 'Pendentes', icon: Clock, count: 0 },
  { value: 'in_progress', label: 'Em Progresso', icon: AlertCircle, count: 0 },
  { value: 'completed', label: 'Concluídas', icon: CheckCircle, count: 0 },
  { value: 'cancelled', label: 'Canceladas', icon: XCircle, count: 0 },
];

export default function FilterDropdown({ currentFilter, onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = filterOptions.find(option => option.value === currentFilter) || filterOptions[0];
  const CurrentIcon = currentOption.icon;

  const handleFilterSelect = (value: string) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]"
      >
        <Filter className="w-4 h-4 text-gray-500" />
        <CurrentIcon className="w-4 h-4" />
        <span className="text-sm">{currentOption.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px]">
            <div className="py-1">
              {filterOptions.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = option.value === currentFilter;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleFilterSelect(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-3 ${
                      isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <OptionIcon className="w-4 h-4" />
                    <span className="flex-1">{option.label}</span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
