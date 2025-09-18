// backend/src/main/java/com/taskflow/api/repository/TaskRepository.java
package com.taskflow.api.repository;

import com.taskflow.api.entity.Task;
import com.taskflow.api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    
    // Buscar tarefas do usuário
    Page<Task> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    List<Task> findByUserAndStatusOrderByCreatedAtDesc(User user, Task.Status status);
    List<Task> findByUserAndPriorityOrderByCreatedAtDesc(User user, Task.Priority priority);
    
    // Buscar tarefas por categoria
    List<Task> findByUserAndCategoryIdOrderByCreatedAtDesc(User user, UUID categoryId);
    
    // Buscar tarefas por título/descrição
    @Query("SELECT t FROM Task t WHERE t.user = :user AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Task> findByUserAndTitleOrDescriptionContainingIgnoreCase(
        @Param("user") User user, 
        @Param("search") String search
    );
    
    // Tarefas vencidas
    @Query("SELECT t FROM Task t WHERE t.user = :user AND t.dueDate < :now AND t.status != 'COMPLETED'")
    List<Task> findOverdueTasks(@Param("user") User user, @Param("now") LocalDateTime now);
    
    // Estatísticas do usuário
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user")
    long countByUser(@Param("user") User user);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.status = :status")
    long countByUserAndStatus(@Param("user") User user, @Param("status") Task.Status status);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user = :user AND t.dueDate < :now AND t.status != 'COMPLETED'")
    long countOverdueTasks(@Param("user") User user, @Param("now") LocalDateTime now);
    
    // Tarefas por período
    @Query("SELECT t FROM Task t WHERE t.user = :user AND t.createdAt BETWEEN :start AND :end")
    List<Task> findByUserAndCreatedAtBetween(
        @Param("user") User user, 
        @Param("start") LocalDateTime start, 
        @Param("end") LocalDateTime end
    );
}
