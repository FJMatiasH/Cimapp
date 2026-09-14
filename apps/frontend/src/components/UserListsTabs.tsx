import React from 'react';
import { Heart, Bookmark, CheckCircle2 } from 'lucide-react';
import { TipoLista, UserLists } from '../types/cima';

interface UserListsTabsProps {
  activeList: TipoLista;
  setActiveList: (list: TipoLista) => void;
  userLists: UserLists;
}

export const UserListsTabs: React.FC<UserListsTabsProps> = ({
  activeList,
  setActiveList,
  userLists
}) => {
  const tabs: { id: TipoLista; label: string; icon: React.ReactNode; count: number; colorClass: string }[] = [
    {
      id: 'favoritas',
      label: 'Cimas Favoritas',
      icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />,
      count: userLists.favoritas.length,
      colorClass: 'text-rose-600 border-rose-500'
    },
    {
      id: 'guardadas',
      label: 'Guardadas / Por Hacer',
      icon: <Bookmark className="w-4 h-4 text-sky-500 fill-sky-500/20" />,
      count: userLists.guardadas.length,
      colorClass: 'text-sky-600 border-sky-500'
    },
    {
      id: 'hechas',
      label: 'Coronadas / Hechas',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />,
      count: userLists.hechas.length,
      colorClass: 'text-emerald-600 border-emerald-500'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200/80 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const isActive = activeList === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveList(tab.id)}
              className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
