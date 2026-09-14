import React from 'react';
import { Mountain, Sparkles, Heart, Bookmark, CheckCircle2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { UserLists } from '../types/cima';

interface NavbarProps {
  activeView: 'catalog' | 'lists';
  setActiveView: (view: 'catalog' | 'lists') => void;
  userLists: UserLists;
  onOpenAdvisor: () => void;
  backendOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  userLists,
  onOpenAdvisor,
  backendOnline
}) => {
  const totalUserPeaks =
    new Set([...userLists.favoritas, ...userLists.guardadas, ...userLists.hechas]).size;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => setActiveView('catalog')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Mountain className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                  Cimapp
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                  España
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Cimas, Rutas & Asesor IA
              </p>
            </div>
          </div>

          {/* Navigation items */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveView('catalog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center space-x-1.5 ${
                activeView === 'catalog'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Mountain className="w-4 h-4" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => setActiveView('lists')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center space-x-1.5 relative ${
                activeView === 'lists'
                  ? 'bg-slate-800 text-sky-400 shadow-sm border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Mis Listas</span>
              {totalUserPeaks > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-sky-500 text-white rounded-full">
                  {totalUserPeaks}
                </span>
              )}
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white shadow-md hover:shadow-sky-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden md:inline">Asesor IA Gemini</span>
              <span className="md:hidden">IA</span>
            </button>

            {/* Backend status dot */}
            <div className="hidden lg:flex items-center pl-2 border-l border-slate-800 text-xs text-slate-400" title={backendOnline ? 'API Conectada (Puerto 3000)' : 'API no responde'}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${backendOnline ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
              <span className="text-[11px]">{backendOnline ? 'API 3000 OK' : 'Desconectado'}</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
