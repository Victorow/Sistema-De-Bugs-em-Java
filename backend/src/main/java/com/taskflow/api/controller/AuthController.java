// src/main/java/com/taskflow/api/controller/AuthController.java
package com.taskflow.api.controller;

import com.taskflow.api.dto.auth.AuthResponse;
import com.taskflow.api.dto.auth.LoginRequest;
import com.taskflow.api.dto.auth.RegisterRequest;
import com.taskflow.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")  // SEM /api - devido ao context-path
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        AuthResponse response = authService.refreshToken(jwt);
        return ResponseEntity.ok(response);
    }
    
    // ENDPOINT DE TESTE
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller funcionando perfeitamente!");
    }
}
