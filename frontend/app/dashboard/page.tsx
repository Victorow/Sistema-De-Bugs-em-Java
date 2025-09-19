// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Plus } from 'lucide-react';
import api from '@/lib/api';
import { TaskStats } from '@/types/task';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await api.get('/tasks/stats');
      setStats(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar estatísticas:', error);
      setError('Erro ao carregar estatísticas');
      // Dados de fallback para evitar erro
      setStats({
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        cancelledTasks: 0,
        overdueTasks: 0,
        inProgressTasks: 0,
        completionRate: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Tarefas',
      value: stats?.totalTasks || 0,
      icon: CheckSquare,
      color: 'bg-blue-500',
    },
    {
      title: 'Pendentes',
      value: stats?.pendingTasks || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Concluídas',
      value: stats?.completedTasks || 0,
      icon: CheckSquare,
      color: 'bg-green-500',
    },
    {
      title: 'Em Atraso',
      value: stats?.overdueTasks || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-6">
      {/* Header com boas-vindas */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bem-vindo de volta, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Aqui está um resumo das suas tarefas hoje
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seção Inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Taxa de Conclusão */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Taxa de Conclusão
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats?.completionRate || 0, 100)}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {stats?.completionRate?.toFixed(1) || 0}%
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {stats?.completedTasks || 0} de {stats?.totalTasks || 0} tarefas concluídas
          </p>
        </div>

        {/* Produtividade */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Produtividade
          </h3>
          <div className="flex items-center text-green-600 mb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-semibold text-lg">
              {stats?.completedTasks || 0}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Tarefas concluídas no total
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <Link href="/dashboard/tasks">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </button>
            </Link>
            <Link href="/dashboard/tasks">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckSquare className="w-4 h-4" />
                Ver Tarefas
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={fetchStats}
            className="text-red-600 text-sm mt-2 hover:text-red-800"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
