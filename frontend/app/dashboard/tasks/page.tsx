// app/dashboard/tasks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Clock, CheckCircle, Edit, Trash2, AlertCircle } from 'lucide-react';
import { taskService } from '@/lib/taskService';
import { Task, TaskRequest } from '@/types/task';
import toast from 'react-hot-toast';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.content || []);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      toast.error('Erro ao carregar tarefas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    try {
      const newTask = await taskService.createTask({
        title: `Nova Tarefa ${new Date().toLocaleTimeString()}`,
        description: 'Tarefa criada via interface web',
        priority: 'HIGH',
        status: 'PENDING',
      });
      setTasks([newTask, ...tasks]);
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar tarefa');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      toast.success('Status atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchTasks();
      return;
    }

    try {
      setLoading(true);
      const results = await taskService.searchTasks(searchQuery);
      setTasks(results);
    } catch (error) {
      toast.error('Erro ao buscar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'Concluída';
      case 'IN_PROGRESS': return 'Em Progresso';
      case 'PENDING': return 'Pendente';
      case 'CANCELLED': return 'Cancelada';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'Alta';
      case 'MEDIUM': return 'Média';
      case 'LOW': return 'Baixa';
      default: return priority;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus.toUpperCase();
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h1>
          <p className="text-gray-600 mt-1">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
          </p>
        </div>
        
        <button
          onClick={handleCreateTask}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendentes</option>
          <option value="in_progress">Em Progresso</option>
          <option value="completed">Concluídas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa ainda'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? 'Tente usar outros termos de busca' 
              : 'Crie sua primeira tarefa para começar'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreateTask}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Criar Tarefa
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusUpdate={handleStatusUpdate}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              getPriorityColor={getPriorityColor}
              getPriorityText={getPriorityText}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente TaskCard inline para simplificar
function TaskCard({ 
  task, 
  onDelete, 
  onStatusUpdate, 
  getStatusColor, 
  getStatusText, 
  getPriorityColor, 
  getPriorityText 
}: {
  task: Task;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  getPriorityText: (priority: string) => string;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow ${
      task.overdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {getStatusText(task.status)}
          </span>
          {task.overdue && (
            <span className="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
              Atrasada
            </span>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
              <div className="py-1">
                {task.status !== 'COMPLETED' && (
                  <button
                    onClick={() => {
                      onStatusUpdate(task.id, 'COMPLETED');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Marcar como concluída
                  </button>
                )}
                
                {task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' && (
                  <button
                    onClick={() => {
                      onStatusUpdate(task.id, 'IN_PROGRESS');
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Em progresso
                  </button>
                )}
                
                <hr className="my-1" />
                
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {getPriorityText(task.priority)}
        </span>
        <span>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>
      </div>
      
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}
