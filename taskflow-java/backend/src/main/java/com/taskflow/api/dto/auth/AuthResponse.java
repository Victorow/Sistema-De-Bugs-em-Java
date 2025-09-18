// backend/src/main/java/com/taskflow/api/dto/auth/AuthResponse.java
package com.taskflow.api.dto.auth;

import com.taskflow.api.dto.user.UserResponse;

public record AuthResponse(
    String token,
    String type,
    UserResponse user
) {
    public AuthResponse(String token, UserResponse user) {
        this(token, "Bearer", user);
    }
}
