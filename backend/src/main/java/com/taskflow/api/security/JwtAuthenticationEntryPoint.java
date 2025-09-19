// src/main/java/com/taskflow/api/security/JwtAuthenticationEntryPoint.java
package com.taskflow.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public void commence(HttpServletRequest request, 
                        HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {
        
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        
        Map<String, Object> data = new HashMap<>();
        data.put("code", "UNAUTHORIZED");
        data.put("message", "Acesso negado. Token não fornecido ou inválido.");
        data.put("timestamp", LocalDateTime.now().toString());
        data.put("path", request.getRequestURI());
        
        response.getWriter().write(objectMapper.writeValueAsString(data));
    }
}
