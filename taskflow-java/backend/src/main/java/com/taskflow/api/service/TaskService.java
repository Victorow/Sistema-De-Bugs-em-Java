// backend/src/main/java/com/taskflow/api/service/TaskService.java
package com.taskflow.api.service;

import com.taskflow.api.dto.task.TaskRequest;
import com.taskflow.api.dto.task.TaskResponse;
import com.taskflow.api.entity.Category;
import com.taskflow.api.entity.Task;
import com.taskflow.api.entity.User;
import com.taskflow.api.exception.NotFoundException;
import com.taskflow.api.repository.CategoryRepository;
import com.taskflow.api.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public Page<TaskResponse> getAllTasksByUser(User user, Pageable pageable) {
        Page<Task> tasks = taskRepository.findByUserOrderByCreatedAtDesc(user, pageable);
        return tasks.map(TaskResponse::fromEntity);
    }
    
    public TaskResponse getTaskByIdAndUser(UUID id, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Tarefa não encontrada"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            throw new NotFoundException("Tarefa não encontrada");
        }
        
        return TaskResponse.fromEntity(task);
    }
    
    public TaskResponse createTask(TaskRequest request, User user) {
        Task task = new Task();
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setUser(user);
        task.setPriority(request.priority());
        task.setStatus(request.status());
        task.setDueDate(request.dueDate());
        
        if (request.categoryId() != null) {
            Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));
            task.setCategory(category);
        }
        
        Task savedTask = taskRepository.save(task);
        return TaskResponse.fromEntity(savedTask);
    }
    
    public TaskResponse updateTask(UUID id, TaskRequest request, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Tarefa não encontrada"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            throw new NotFoundException("Tarefa não encontrada");
        }
        
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setPriority(request.priority());
        task.setStatus(request.status());
        task.setDueDate(request.dueDate());
        
        if (request.categoryId() != null) {
            Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));
            task.setCategory(category);
        } else {
            task.setCategory(null);
        }
        
        Task updatedTask = taskRepository.save(task);
        return TaskResponse.fromEntity(updatedTask);
    }
    
    public void deleteTask(UUID id, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Tarefa não encontrada"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            throw new NotFoundException("Tarefa não encontrada");
        }
        
        taskRepository.delete(task);
    }
    
    public List<TaskResponse> searchTasks(String query, User user) {
        List<Task> tasks = taskRepository.findByUserAndTitleOrDescriptionContainingIgnoreCase(user, query);
        return tasks.stream()
            .map(TaskResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public List<TaskResponse> getTasksByStatus(Task.Status status, User user) {
        List<Task> tasks = taskRepository.findByUserAndStatusOrderByCreatedAtDesc(user, status);
        return tasks.stream()
            .map(TaskResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public List<TaskResponse> getOverdueTasks(User user) {
        List<Task> tasks = taskRepository.findOverdueTasks(user, LocalDateTime.now());
        return tasks.stream()
            .map(TaskResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public TaskResponse updateTaskStatus(UUID id, Task.Status status, User user) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Tarefa não encontrada"));
        
        if (!task.getUser().getId().equals(user.getId())) {
            throw new NotFoundException("Tarefa não encontrada");
        }
        
        task.setStatus(status);
        
        Task updatedTask = taskRepository.save(task);
        return TaskResponse.fromEntity(updatedTask);
    }
    
    public Map<String, Object> getTaskStatistics(User user) {
        Map<String, Object> stats = new HashMap<>();
        
        long totalTasks = taskRepository.countByUser(user);
        long pendingTasks = taskRepository.countByUserAndStatus(user, Task.Status.PENDING);
        long inProgressTasks = taskRepository.countByUserAndStatus(user, Task.Status.IN_PROGRESS);
        long completedTasks = taskRepository.countByUserAndStatus(user, Task.Status.COMPLETED);
        long cancelledTasks = taskRepository.countByUserAndStatus(user, Task.Status.CANCELLED);
        long overdueTasks = taskRepository.countOverdueTasks(user, LocalDateTime.now());
        
        stats.put("totalTasks", totalTasks);
        stats.put("pendingTasks", pendingTasks);
        stats.put("inProgressTasks", inProgressTasks);
        stats.put("completedTasks", completedTasks);
        stats.put("cancelledTasks", cancelledTasks);
        stats.put("overdueTasks", overdueTasks);
        
        // Calcular percentual de conclusão
        if (totalTasks > 0) {
            double completionRate = (double) completedTasks / totalTasks * 100;
            stats.put("completionRate", Math.round(completionRate * 100.0) / 100.0);
        } else {
            stats.put("completionRate", 0.0);
        }
        
        return stats;
    }
}
