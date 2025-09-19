// backend/src/main/java/com/taskflow/api/repository/CategoryRepository.java
package com.taskflow.api.repository;

import com.taskflow.api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Optional<Category> findByName(String name);
    boolean existsByName(String name);
}
