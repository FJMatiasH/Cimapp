import React from 'react';
import { Search, Filter, RotateCcw, Mountain } from 'lucide-react';
import { DificultadCima } from '../types/cima';

interface CimaFiltersProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (d: string) => void;
  selectedProvince: string;
  setSelectedProvince: (p: string) => void;
  provinces: string[];
  totalResults: number;
  onResetFilters: () => void;
}

const DIFFICULTIES = ['Todas', 'Fácil', 'Moderada', 'Difícil', 'Muy Difícil'];

export const CimaFilters: React.FC<CimaFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedProvince,
  setSelectedProvince,
  provinces,
  totalResults,
  onResetFilters
}) => {
  const isFiltered =
    searchTerm !== '' || selectedDifficulty !== 'Todas' || selectedProvince !== 'Todas';

  const getDifficultyColor = (diff: string, isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';
    }
    switch (diff) {
      case 'Fácil':
        return 'bg-emerald-600 text-white border-emerald-600 shadow-sm';
      case 'Moderada':
        return 'bg-sky-600 text-white border-sky-600 shadow-sm';
      case 'Difícil':
        return 'bg-amber-600 text-white border-amber-600 shadow-sm';
      case 'Muy Difícil':
        return 'bg-rose-600 text-white border-rose-600 shadow-sm';
      default:
        return 'bg-slate-900 text-white border-slate-900 shadow-sm';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 mb-8 transition-all duration-200">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar cima por nombre, provincia, cordillera..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Province dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Provincia:
          </label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors text-slate-700"
          >
            <option value="Todas">Todas las provincias</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-dashed border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Difficulty Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Dificultad:
        </span>
        {DIFFICULTIES.map((diff) => {
          const isSelected = selectedDifficulty === diff;
          return (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${getDifficultyColor(
                diff,
                isSelected
              )}`}
            >
              {diff}
            </button>
          );
        })}

        <div className="ml-auto text-xs text-slate-500 font-medium">
          {totalResults} {totalResults === 1 ? 'cima encontrada' : 'cimas encontradas'}
        </div>
      </div>
    </div>
  );
};
