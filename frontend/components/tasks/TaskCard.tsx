// components/tasks/TaskCard.tsx
'use client';

import { useState } from 'react';
import { MoreVertical, Calendar, Flag, Clock, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusUpdate: (taskId: string, status: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusUpdate }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'Alta';
      case 'MEDIUM': return 'Média';
      case 'LOW': return 'Baixa';
      default: return priority;
    }
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusUpdate(task.id, newStatus);
    setShowMenu(false);
  };

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
                <button
                  onClick={() => { onEdit(task); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                
                {task.status !== 'COMPLETED' && (
                  <button
                    onClick={() => handleStatusChange('COMPLETED')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Marcar como concluída
                  </button>
                )}
                
                {task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' && (
                  <button
                    onClick={() => handleStatusChange('IN_PROGRESS')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Em progresso
                  </button>
                )}
                
                <hr className="my-1" />
                
                <button
                  onClick={() => { onDelete(task.id); setShowMenu(false); }}
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

      {/* Title and Description */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flag className="w-3 h-3" />
            <span className={`font-medium ${getPriorityColor(task.priority).split(' ')[0]}`}>
              {getPriorityText(task.priority)}
            </span>
          </div>
          
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {format(new Date(task.dueDate), 'dd/MM', { locale: ptBR })}
              </span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div>
            {format(new Date(task.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
          </div>
        </div>
      </div>
      
      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}
