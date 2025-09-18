// backend/src/main/java/com/taskflow/api/service/AuthService.java
package com.taskflow.api.service;

import com.taskflow.api.dto.auth.AuthResponse;
import com.taskflow.api.dto.auth.LoginRequest;
import com.taskflow.api.dto.auth.RegisterRequest;
import com.taskflow.api.dto.user.UserResponse;
import com.taskflow.api.entity.User;
import com.taskflow.api.exception.BadRequestException;
import com.taskflow.api.repository.UserRepository;
import com.taskflow.api.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email já está em uso");
        }
        
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setEmailVerified(true); // Para simplificar, vamos considerar o email como verificado
        
        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        
        return new AuthResponse(jwtToken, UserResponse.fromEntity(savedUser));
    }
    
    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
            )
        );
        
        User user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new BadRequestException("Credenciais inválidas"));
        
        String jwtToken = jwtService.generateToken(user);
        
        return new AuthResponse(jwtToken, UserResponse.fromEntity(user));
    }
    
    public AuthResponse refreshToken(String token) {
        String userEmail = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new BadRequestException("Usuário não encontrado"));
        
        if (jwtService.isTokenValid(token, user)) {
            String newToken = jwtService.generateToken(user);
            return new AuthResponse(newToken, UserResponse.fromEntity(user));
        } else {
            throw new BadRequestException("Token inválido");
        }
    }
}
