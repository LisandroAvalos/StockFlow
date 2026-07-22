package com.stockflow.backend.repository;

import com.stockflow.backend.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    List<StockMovement> findByType(StockMovement.StockMovementType type);
    List<StockMovement> findByDateBetween(LocalDateTime start, LocalDateTime end);
    List<StockMovement> findByProductId(Long productId);
    List<StockMovement> findByUserId(Long userId);
}