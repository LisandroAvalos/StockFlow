package com.stockflow.backend.repository;

import com.stockflow.backend.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findByName(String name);
    Optional<Supplier> findByEmail(String email);
    List<Supplier> findByActiveTrue();
}
