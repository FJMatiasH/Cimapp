import React, { useState } from 'react';
import { Sparkles, X, Compass, Mountain, ShieldAlert, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { RecommendationResponse, Cima } from '../types/cima';

interface GeminiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  provinces: string[];
  onSelectCima: (cima: Cima) => void;
  allCimas: Cima[];
}

export const GeminiAdvisorModal: React.FC<GeminiAdvisorModalProps> = ({
  isOpen,
  onClose,
  provinces,
  onSelectCima,
  allCimas
}) => {
  if (!isOpen) return null;

  const [nivel, setNivel] = useState('Moderada');
  const [provincia, setProvincia] = useState('Todas');
  const [altitudMaxima, setAltitudMaxima] = useState<number | ''>('');
  const [preferencias, setPreferencias] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getRecommendations({
        nivel,
        provincia: provincia !== 'Todas' ? provincia : undefined,
        altitudMaxima: altitudMaxima !== '' ? Number(altitudMaxima) : undefined,
        preferencias: preferencias.trim() || undefined
      });
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al obtener recomendaciones de Gemini');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-xs font-semibold text-sky-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Inteligencia Artificial Gemini</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Asesor Virtual de Montaña
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Indícanos tu experiencia y preferencias. Analizaremos el catálogo para sugerirte la cumbre ideal con consejos de seguridad.
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm mb-6 flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Aviso:</span> {error}
              </div>
            </div>
          )}

          {!result ? (
            /* Form view */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nivel técnico */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nivel Técnico / Experiencia
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'Fácil', desc: 'Iniciación senderista' },
                    { val: 'Moderada', desc: 'Rutas de montaña' },
                    { val: 'Difícil', desc: 'Alta montaña y cresterío' },
                    { val: 'Muy Difícil', desc: 'Escalada / Vías técnicas' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.val}
                      onClick={() => setNivel(item.val)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        nivel === item.val
                          ? 'border-sky-500 bg-sky-50/70 text-sky-900 ring-2 ring-sky-500/20 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.val}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferencia Geográfica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Provincia / Región Preferida
                  </label>
                  <select
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="Todas">Cualquiera en España</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Altitud Máxima Deseada (opcional)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej. 3000 metros"
                    value={altitudMaxima}
                    onChange={(e) => setAltitudMaxima(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Preferencias libres */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  ¿Qué buscas en esta aventura? (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Quiero una ruta para disfrutar en verano con buenas panorámicas y refugio cercano..."
                  value={preferencias}
                  onChange={(e) => setPreferencias(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Consultando a Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      <span>Generar Recomendaciones</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Results view */
            <div className="space-y-6">
              {/* Introduction message */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 text-sm leading-relaxed">
                <p className="font-medium">{result.mensaje}</p>
              </div>

              {/* Recommended peaks cards */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Cimas seleccionadas para ti:
                </h4>

                {result.recomendaciones.map((rec, i) => {
                  const matchingCima = allCimas.find((c) => c.id === rec.cimaId);

                  return (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-sky-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                            {i + 1}
                          </div>
                          <h5 className="font-bold text-base text-slate-900">{rec.nombre}</h5>
                        </div>

                        {matchingCima && (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectCima(matchingCima);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
                          >
                            <span>Ver ficha</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 text-xs text-slate-700">
                        <div>
                          <span className="font-bold text-slate-900">Por qué encaja: </span>
                          <span>{rec.motivo}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Consejo de seguridad: </span>
                            <span>{rec.consejoSeguridad}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Back to form button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                >
                  Pedir otra recomendación
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
