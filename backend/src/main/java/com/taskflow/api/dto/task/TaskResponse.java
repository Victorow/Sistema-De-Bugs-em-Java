// backend/src/main/java/com/taskflow/api/dto/task/TaskResponse.java
package com.taskflow.api.dto.task;

import com.taskflow.api.dto.category.CategoryResponse;
import com.taskflow.api.entity.Task;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskResponse(
    UUID id,
    String title,
    String description,
    CategoryResponse category,
    Task.Priority priority,
    Task.Status status,
    LocalDateTime dueDate,
    LocalDateTime completedAt,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    boolean overdue
) {
    public static TaskResponse fromEntity(Task task) {
        return new TaskResponse(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getCategory() != null ? CategoryResponse.fromEntity(task.getCategory()) : null,
            task.getPriority(),
            task.getStatus(),
            task.getDueDate(),
            task.getCompletedAt(),
            task.getCreatedAt(),
            task.getUpdatedAt(),
            task.isOverdue()
        );
    }
}
