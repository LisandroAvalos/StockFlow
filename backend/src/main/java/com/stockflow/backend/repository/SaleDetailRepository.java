package com.stockflow.backend.repository;

import com.stockflow.backend.entity.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import com.stockflow.backend.repository.projection.BestSellingProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleDetailRepository extends JpaRepository<SaleDetail, Long> {
    List<SaleDetail> findBySaleId(Long saleId);
    List<SaleDetail> findByProductId(Long productId);
    @Query("SELECT saleDetail.product as product, SUM(saleDetail.quantity) as totalSold " +
            "FROM SaleDetail saleDetail " +
            "GROUP BY saleDetail.product " +
            "ORDER BY totalSold DESC")
    List<BestSellingProduct> findMostSoldProducts(Pageable pageable);
}