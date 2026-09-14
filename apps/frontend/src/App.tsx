import React, { useEffect, useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CimaFilters } from './components/CimaFilters';
import { UserListsTabs } from './components/UserListsTabs';
import { CimaCard } from './components/CimaCard';
import { CimaDetailModal } from './components/CimaDetailModal';
import { GeminiAdvisorModal } from './components/GeminiAdvisorModal';
import { api } from './services/api';
import { Cima, UserLists, TipoLista } from './types/cima';
import { Mountain, Loader2, Sparkles, Heart, Compass, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const [cimas, setCimas] = useState<Cima[]>([]);
  const [userLists, setUserLists] = useState<UserLists>({
    favoritas: [],
    guardadas: [],
    hechas: []
  });

  const [activeView, setActiveView] = useState<'catalog' | 'lists'>('catalog');
  const [activeListTab, setActiveListTab] = useState<TipoLista>('favoritas');

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [selectedProvince, setSelectedProvince] = useState('Todas');

  // Modales
  const [selectedCima, setSelectedCima] = useState<Cima | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Estados de red
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendOnline, setBackendOnline] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [cimasData, listsData, healthData] = await Promise.all([
          api.getCimas(),
          api.getUserLists().catch(() => ({ favoritas: [], guardadas: [], hechas: [] })),
          api.checkHealth().catch(() => ({ status: 'down', geminiConfigured: false }))
        ]);

        setCimas(cimasData);
        setUserLists(listsData);
        setBackendOnline(healthData.status === 'ok');
      } catch (err: any) {
        console.error('Error cargando datos:', err);
        setError('No se pudo conectar con el servidor backend en http://localhost:3000/api. Asegúrate de que el servidor Express esté en ejecución.');
        setBackendOnline(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lista de provincias únicas disponibles
  const provinces = useMemo(() => {
    const set = new Set<string>();
    cimas.forEach((c) => {
      if (c.provincia) {
        // En caso de provincias compuestas como "Asturias / León" o "Madrid / Segovia"
        set.add(c.provincia);
      }
    });
    return Array.from(set).sort();
  }, [cimas]);

  // Manejador para alternar listas (con actualización optimista inmediata)
  const handleToggleList = async (cimaId: string, listType: TipoLista) => {
    // 1. Optimistic UI update
    setUserLists((prev) => {
      const currentList = prev[listType];
      const exists = currentList.includes(cimaId);
      return {
        ...prev,
        [listType]: exists
          ? currentList.filter((id) => id !== cimaId)
          : [...currentList, cimaId]
      };
    });

    // 2. Network sync
    try {
      const res = await api.toggleUserList(cimaId, listType);
      setUserLists(res.lists);
    } catch (err) {
      console.error('Error sincronizando lista con backend:', err);
      // Revertir si falla
      try {
        const fresh = await api.getUserLists();
        setUserLists(fresh);
      } catch (e) {}
    }
  };

  // Filtrado de cimas para la vista activa
  const displayedCimas = useMemo(() => {
    let base = [...cimas];

    // Si estamos en la vista de listas de usuario
    if (activeView === 'lists') {
      const allowedIds = new Set(userLists[activeListTab]);
      base = base.filter((c) => allowedIds.has(c.id));
    }

    // Aplicar filtros de búsqueda
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      base = base.filter(
        (c) =>
          c.nombre.toLowerCase().includes(q) ||
          c.provincia.toLowerCase().includes(q) ||
          c.sistemaMontanoso.toLowerCase().includes(q) ||
          c.descripcion.toLowerCase().includes(q)
      );
    }

    // Aplicar filtro de dificultad
    if (selectedDifficulty !== 'Todas') {
      base = base.filter((c) => c.dificultad.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    // Aplicar filtro de provincia
    if (selectedProvince !== 'Todas') {
      base = base.filter((c) => c.provincia.toLowerCase().includes(selectedProvince.toLowerCase()));
    }

    return base;
  }, [cimas, activeView, activeListTab, userLists, searchTerm, selectedDifficulty, selectedProvince]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('Todas');
    setSelectedProvince('Todas');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        userLists={userLists}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        backendOnline={backendOnline}
      />

      {/* Hero Section */}
      <Hero onOpenAdvisor={() => setIsAdvisorOpen(true)} totalCimas={cimas.length} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert if backend unreachable */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold">Error de conexión:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* View Switch / Title Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              {activeView === 'catalog' ? (
                <>
                  <Mountain className="w-6 h-6 text-sky-600" />
                  <span>Catálogo de Cimas de España</span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 text-rose-500" />
                  <span>Mis Listas de Cumbres</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {activeView === 'catalog'
                ? 'Explora las principales cimas organizadas por altitud, provincia y grado de dificultad.'
                : 'Supervisa tus picos preferidos, cimas pendientes por coronar y objetivos completados.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'catalog'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Catálogo General
            </button>
            <button
              onClick={() => setActiveView('lists')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'lists'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mis Listas
            </button>
          </div>
        </div>

        {/* User Lists Tabs (Solo visibles en vista 'lists') */}
        {activeView === 'lists' && (
          <UserListsTabs
            activeList={activeListTab}
            setActiveList={setActiveListTab}
            userLists={userLists}
          />
        )}

        {/* Filters Panel */}
        <CimaFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          provinces={provinces}
          totalResults={displayedCimas.length}
          onResetFilters={handleResetFilters}
        />

        {/* Cimas Grid or Loading or Empty State */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
            <p className="text-sm font-medium">Cargando cimas desde el backend...</p>
          </div>
        ) : displayedCimas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCimas.map((cima) => (
              <CimaCard
                key={cima.id}
                cima={cima}
                userLists={userLists}
                onToggleList={handleToggleList}
                onOpenDetail={(c) => setSelectedCima(c)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {activeView === 'lists'
                ? `No tienes ninguna cima en ${activeListTab}`
                : 'No se encontraron cimas'}
            </h3>

            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
              {activeView === 'lists'
                ? 'Explora el catálogo y pulsa los botones de acción rápida para agregar cimas a tus metas de montaña.'
                : 'Prueba a ajustar tus criterios de búsqueda, cambiar la dificultad o restablecer los filtros.'}
            </p>

            {activeView === 'lists' ? (
              <button
                onClick={() => setActiveView('catalog')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Ir al Catálogo General
              </button>
            ) : (
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Restablecer Filtros
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-semibold text-slate-700">
            <Mountain className="w-4 h-4 text-sky-600" />
            <span>Cimapp · Guía Oficial de Cimas de España</span>
          </div>
          <p>
            Desarrollado con React, Tailwind CSS y Express. Potenciado con Google Gemini AI.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CimaDetailModal
        cima={selectedCima}
        onClose={() => setSelectedCima(null)}
        userLists={userLists}
        onToggleList={handleToggleList}
      />

      <GeminiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        provinces={provinces}
        onSelectCima={(cima) => setSelectedCima(cima)}
        allCimas={cimas}
      />
    </div>
  );
};

export default App;
