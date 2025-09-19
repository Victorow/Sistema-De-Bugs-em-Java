// backend/src/main/java/com/taskflow/api/dto/user/UserResponse.java
package com.taskflow.api.dto.user;

import com.taskflow.api.entity.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
    UUID id,
    String name,
    String email,
    String avatarUrl,
    User.Role role,
    Boolean emailVerified,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getAvatarUrl(),
            user.getRole(),
            user.getEmailVerified(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
}
