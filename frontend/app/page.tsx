'EOF'
'use client';

import { useEffect, useState } from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import api from '@/lib/api';
import { TaskStats } from '@/types/task';

export default function DashboardPage() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/tasks/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Taxa de Conclusão
          </h3>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats?.completionRate || 0}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {stats?.completionRate?.toFixed(1) || 0}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Produtividade
          </h3>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">
              {stats?.completedTasks || 0} tarefas concluídas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}