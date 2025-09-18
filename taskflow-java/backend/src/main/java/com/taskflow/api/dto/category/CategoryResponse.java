// backend/src/main/java/com/taskflow/api/dto/category/CategoryResponse.java
package com.taskflow.api.dto.category;

import com.taskflow.api.entity.Category;

import java.time.LocalDateTime;
import java.util.UUID;

public record CategoryResponse(
    UUID id,
    String name,
    String color,
    String icon,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getColor(),
            category.getIcon(),
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }
}
