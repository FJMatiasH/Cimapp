import React from 'react';
import { Heart, Bookmark, CheckCircle2, MapPin, Eye, Mountain } from 'lucide-react';
import { Cima, UserLists, TipoLista } from '../types/cima';

interface CimaCardProps {
  cima: Cima;
  userLists: UserLists;
  onToggleList: (cimaId: string, listType: TipoLista) => void;
  onOpenDetail: (cima: Cima) => void;
}

export const CimaCard: React.FC<CimaCardProps> = ({
  cima,
  userLists,
  onToggleList,
  onOpenDetail
}) => {
  const isFavorita = userLists.favoritas.includes(cima.id);
  const isGuardada = userLists.guardadas.includes(cima.id);
  const isHecha = userLists.hechas.includes(cima.id);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Fácil':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderada':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Difícil':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Muy Difícil':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div
        className="relative h-48 sm:h-52 overflow-hidden cursor-pointer bg-slate-900"
        onClick={() => onOpenDetail(cima)}
      >
        <img
          src={cima.imagenes[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'}
          alt={cima.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient shadow for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Altitude badge (Top right) */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono font-bold shadow-md flex items-center gap-1">
          <Mountain className="w-3.5 h-3.5 text-sky-400" />
          <span>{cima.altitud.toLocaleString('es-ES')} m</span>
        </div>

        {/* Difficulty badge (Top left) */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border backdrop-blur-md shadow-md ${getDifficultyBadge(
              cima.dificultad
            )}`}
          >
            {cima.dificultad}
          </span>
        </div>

        {/* Name and Province overlay in bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors drop-shadow-sm">
            {cima.nombre}
          </h3>
          <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5 drop-shadow-sm font-medium">
            <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
            <span>{cima.provincia} · {cima.sistemaMontanoso}</span>
          </p>
        </div>
      </div>

      {/* Description Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {cima.descripcion}
        </p>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {/* Detail Link */}
          <button
            onClick={() => onOpenDetail(cima)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 py-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Ficha</span>
          </button>

          {/* Quick List Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Favorita Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleList(cima.id, 'favoritas');
              }}
              title={isFavorita ? 'Quitar de Favoritas' : 'Marcar como Favorita'}
              className={`p-2 rounded-xl border transition-all duration-150 ${
                isFavorita
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                  : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isFavorita ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>

            {/* Guardada / Por hacer Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleList(cima.id, 'guardadas');
              }}
              title={isGuardada ? 'Quitar de Guardadas' : 'Guardar para hacer'}
              className={`p-2 rounded-xl border transition-all duration-150 ${
                isGuardada
                  ? 'bg-sky-50 border-sky-200 text-sky-600 shadow-sm'
                  : 'border-slate-200 text-slate-400 hover:text-sky-600 hover:bg-sky-50/50'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isGuardada ? 'fill-sky-500 text-sky-500' : ''
                }`}
              />
            </button>

            {/* Hecha / Coronada Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleList(cima.id, 'hechas');
              }}
              title={isHecha ? 'Quitar de Coronadas' : '¡Marcar como Coronada!'}
              className={`p-2 rounded-xl border transition-all duration-150 ${
                isHecha
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
                  : 'border-slate-200 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50/50'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isHecha ? 'fill-emerald-500 text-white' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
