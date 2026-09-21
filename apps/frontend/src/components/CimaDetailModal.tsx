import React, { useState } from 'react';
import { X, MapPin, Mountain, TrendingUp, Navigation, Heart, Bookmark, CheckCircle2, ExternalLink } from 'lucide-react';
import { Cima, UserLists, TipoLista } from '../types/cima';

interface CimaDetailModalProps {
  cima: Cima | null;
  onClose: () => void;
  userLists: UserLists;
  onToggleList: (cimaId: string, listType: TipoLista) => void;
}

export const CimaDetailModal: React.FC<CimaDetailModalProps> = ({
  cima,
  onClose,
  userLists,
  onToggleList
}) => {
  if (!cima) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isFavorita = userLists.favoritas.includes(cima.id);
  const isGuardada = userLists.guardadas.includes(cima.id);
  const isHecha = userLists.hechas.includes(cima.id);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Fácil':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Moderada':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Difícil':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Muy Difícil':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const mapUrl = cima.coordenadas
    ? `https://www.google.com/maps?q=${cima.coordenadas.lat},${cima.coordenadas.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cima.nombre + ' ' + cima.provincia)}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%230f172a"/><path d="M100 320 L260 130 L350 230 L460 110 L560 320 Z" fill="%231e293b"/><path d="M260 130 L295 175 L225 175 Z" fill="%2338bdf8" opacity="0.8"/><path d="M460 110 L485 145 L435 145 Z" fill="%2338bdf8" opacity="0.8"/><text x="50%" y="85%" font-family="sans-serif" font-weight="bold" font-size="18" fill="%2394a3b8" text-anchor="middle">🏔️ Cima de España</text></svg>';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Main Photo Gallery */}
          <div className="relative h-64 sm:h-80 bg-slate-900">
            <img
              src={cima.imagenes[activeImageIndex] || cima.imagenes[0]}
              alt={cima.nombre}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Title & Altitude Overlay */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyBadge(cima.dificultad)}`}>
                  {cima.dificultad}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-900/80 backdrop-blur-md border border-white/20 text-sky-300 font-mono">
                  {cima.altitud.toLocaleString('es-ES')} m s. n. m.
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                {cima.nombre}
              </h2>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{cima.provincia} · {cima.sistemaMontanoso}</span>
              </p>
            </div>
          </div>

          {/* Thumbnails row if more than 1 image */}
          {cima.imagenes.length > 1 && (
            <div className="flex gap-2 p-3 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
              {cima.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-14 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-sky-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" onError={handleImageError} />
                </button>
              ))}
            </div>
          )}

          {/* Body Information */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Technical Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <Mountain className="w-3.5 h-3.5 text-sky-500" />
                  <span>Altitud Máx</span>
                </div>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  {cima.altitud} m
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Desnivel +</span>
                </div>
                <div className="text-lg font-bold text-slate-900 font-mono">
                  {cima.desnivelPositivo ? `+${cima.desnivelPositivo} m` : 'Variable'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <Navigation className="w-3.5 h-3.5 text-purple-500" />
                  <span>Dificultad</span>
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {cima.dificultad}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Ubicación</span>
                </div>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 mt-1"
                >
                  <span>Ver mapa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Descripción & Características de Ascensión
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                {cima.descripcion}
              </p>
            </div>

            {/* Action Bar (List toggles) */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Gestionar en tus listas de montañero:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => onToggleList(cima.id, 'favoritas')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    isFavorita
                      ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorita ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{isFavorita ? 'En Favoritas ❤️' : 'Añadir a Favoritas'}</span>
                </button>

                <button
                  onClick={() => onToggleList(cima.id, 'guardadas')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    isGuardada
                      ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isGuardada ? 'fill-sky-500 text-sky-500' : 'text-slate-400'}`} />
                  <span>{isGuardada ? 'Guardada 📌' : 'Guardar por hacer'}</span>
                </button>

                <button
                  onClick={() => onToggleList(cima.id, 'hechas')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    isHecha
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isHecha ? 'fill-emerald-500 text-white' : 'text-slate-400'}`} />
                  <span>{isHecha ? '¡Coronada! 🏔️' : 'Marcar como Coronada'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
