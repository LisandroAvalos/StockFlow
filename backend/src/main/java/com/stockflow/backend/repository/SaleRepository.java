package com.stockflow.backend.repository;

import com.stockflow.backend.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    List<Sale> findByDateBetween(LocalDateTime start, LocalDateTime end);
    List<Sale> findByUserId(Long id);

}
