// lib/taskService.ts
import api from './api';
import { Task, TaskRequest, TaskStats } from '@/types/task';

export const taskService = {
  // Buscar todas as tarefas
  getAllTasks: async (page = 0, size = 20) => {
    const response = await api.get(`/tasks?page=${page}&size=${size}`);
    return response.data;
  },

  // Buscar tarefa por ID
  getTaskById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Criar nova tarefa
  createTask: async (data: TaskRequest) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  // Atualizar tarefa
  updateTask: async (id: string, data: TaskRequest) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  // Deletar tarefa
  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },

  // Atualizar status da tarefa
  updateTaskStatus: async (id: string, status: string) => {
    const response = await api.patch(`/tasks/${id}/status?status=${status}`);
    return response.data;
  },

  // Buscar tarefas
  searchTasks: async (query: string) => {
    const response = await api.get(`/tasks/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Estatísticas
  getTaskStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },

  // Buscar por status
  getTasksByStatus: async (status: string) => {
    const response = await api.get(`/tasks/status/${status}`);
    return response.data;
  },

  // Tarefas em atraso
  getOverdueTasks: async () => {
    const response = await api.get('/tasks/overdue');
    return response.data;
  },
};
