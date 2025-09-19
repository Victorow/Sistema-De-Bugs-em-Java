// app/dashboard/stats/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { taskService } from '@/lib/taskService';
import { TaskStats } from '@/types/task';

export default function StatsPage() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await taskService.getTaskStats();
      setStats(data);
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
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const chartData = [
    { label: 'Pendentes', value: stats?.pendingTasks || 0, color: 'bg-yellow-500' },
    { label: 'Em Progresso', value: stats?.inProgressTasks || 0, color: 'bg-blue-500' },
    { label: 'Concluídas', value: stats?.completedTasks || 0, color: 'bg-green-500' },
    { label: 'Canceladas', value: stats?.cancelledTasks || 0, color: 'bg-red-500' },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Estatísticas</h1>
        <p className="text-gray-600">Acompanhe seu desempenho e produtividade</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalTasks || 0}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-600">{stats?.completedTasks || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats?.pendingTasks || 0}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats?.completionRate?.toFixed(1) || 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Gráfico de Barras Simples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição de Tarefas
          </h3>
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{item.label}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className={`${item.color} h-4 rounded-full transition-all duration-500`}
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-sm font-medium text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo Geral
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Tarefas:</span>
              <span className="font-semibold">{stats?.totalTasks || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxa de Conclusão:</span>
              <span className="font-semibold text-green-600">
                {stats?.completionRate?.toFixed(1) || 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tarefas em Atraso:</span>
              <span className="font-semibold text-red-600">{stats?.overdueTasks || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Em Progresso:</span>
              <span className="font-semibold text-blue-600">{stats?.inProgressTasks || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
