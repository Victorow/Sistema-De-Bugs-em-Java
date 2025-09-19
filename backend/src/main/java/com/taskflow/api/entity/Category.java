// src/main/java/com/taskflow/api/entity/Category.java
package com.taskflow.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotBlank(message = "Nome da categoria é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Column(unique = true, nullable = false, length = 100)
    private String name;
    
    @Pattern(regexp = "^#[A-Fa-f0-9]{6}$", message = "Cor deve estar no formato hexadecimal (#RRGGBB)")
    @Column(nullable = false, length = 7)
    private String color = "#3B82F6";
    
    @Size(max = 50, message = "Ícone deve ter no máximo 50 caracteres")
    @Column(length = 50)
    private String icon = "folder";
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Task> tasks;
    
    // Constructors
    public Category() {}
    
    public Category(String name, String color, String icon) {
        this.name = name;
        this.color = color;
        this.icon = icon;
    }
    
    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getColor() { return color; }
    public void setColor(String color) {
        this.color = color;
        this.updatedAt = LocalDateTime.now();
    }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) {
        this.icon = icon;
        this.updatedAt = LocalDateTime.now();
    }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Set<Task> getTasks() { return tasks; }
    public void setTasks(Set<Task> tasks) { this.tasks = tasks; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
