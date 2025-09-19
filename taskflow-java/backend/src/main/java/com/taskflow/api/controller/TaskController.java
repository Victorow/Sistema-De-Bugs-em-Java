// backend/src/main/java/com/taskflow/api/controller/TaskController.java
package com.taskflow.api.controller;

import com.taskflow.api.dto.task.TaskRequest;
import com.taskflow.api.dto.task.TaskResponse;
import com.taskflow.api.entity.Task;
import com.taskflow.api.entity.User;
import com.taskflow.api.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getAllTasks(
            @AuthenticationPrincipal User user,
            Pageable pageable
    ) {
        Page<TaskResponse> tasks = taskService.getAllTasksByUser(user, pageable);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user
    ) {
        TaskResponse task = taskService.getTaskByIdAndUser(id, user);
        return ResponseEntity.ok(task);
    }
    
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request,
            @AuthenticationPrincipal User user
    ) {
        TaskResponse task = taskService.createTask(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable UUID id,
            @Valid @RequestBody TaskRequest request,
            @AuthenticationPrincipal User user
    ) {
        TaskResponse task = taskService.updateTask(id, request, user);
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user
    ) {
        taskService.deleteTask(id, user);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TaskResponse>> searchTasks(
            @RequestParam String query,
            @AuthenticationPrincipal User user
    ) {
        List<TaskResponse> tasks = taskService.searchTasks(query, user);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskResponse>> getTasksByStatus(
            @PathVariable Task.Status status,
            @AuthenticationPrincipal User user
    ) {
        List<TaskResponse> tasks = taskService.getTasksByStatus(status, user);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/overdue")
    public ResponseEntity<List<TaskResponse>> getOverdueTasks(
            @AuthenticationPrincipal User user
    ) {
        List<TaskResponse> tasks = taskService.getOverdueTasks(user);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getTaskStats(
            @AuthenticationPrincipal User user
    ) {
        Map<String, Object> stats = taskService.getTaskStatistics(user);
        return ResponseEntity.ok(stats);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponse> updateTaskStatus(
            @PathVariable UUID id,
            @RequestParam Task.Status status,
            @AuthenticationPrincipal User user
    ) {
        TaskResponse task = taskService.updateTaskStatus(id, status, user);
        return ResponseEntity.ok(task);
    }
}
