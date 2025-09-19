// backend/src/main/java/com/taskflow/api/dto/task/TaskRequest.java
package com.taskflow.api.dto.task;

import com.taskflow.api.entity.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskRequest(
    @NotBlank(message = "Título da tarefa é obrigatório")
    @Size(min = 3, max = 255, message = "Título deve ter entre 3 e 255 caracteres")
    String title,
    
    @Size(max = 1000, message = "Descrição deve ter no máximo 1000 caracteres")
    String description,
    
    UUID categoryId,
    Task.Priority priority,
    Task.Status status,
    LocalDateTime dueDate
) {
    public TaskRequest {
        if (priority == null) priority = Task.Priority.MEDIUM;
        if (status == null) status = Task.Status.PENDING;
    }
}
