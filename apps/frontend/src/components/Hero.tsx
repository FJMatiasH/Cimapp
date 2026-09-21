import React from 'react';
import { Compass, Sparkles, MapPin, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenAdvisor: () => void;
  totalCimas: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor, totalCimas }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-sky-400 mb-3 shadow-sm backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5" />
          <span>Plataforma Oficial de Cumbres de España</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Conquista las cimas más emblemáticas de <span className="bg-gradient-to-r from-sky-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">España</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-5 font-normal leading-relaxed">
          Explora fichas técnicas completas de las grandes cumbres, registra tus progresos en listas personalizadas y recibe recomendaciones inteligentes impulsadas por IA según tu nivel.
        </p>

        {/* Quick CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={onOpenAdvisor}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Pedir recomendación a Gemini AI</span>
          </button>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4 border-t border-slate-800/80">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl font-bold text-sky-400 font-mono">{totalCimas}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Cimas Catalogadas</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl font-bold text-emerald-400 font-mono">3.718 m</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Más alta (Teide)</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl font-bold text-amber-400 font-mono">4 Niveles</div>
            <div className="text-[11px] text-slate-400 mt-0.5">De Fácil a Muy Difícil</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl font-bold text-purple-400 font-mono">Gemini AI</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Asistente Inteligente</div>
          </div>
        </div>
      </div>
    </div>
  );
};
