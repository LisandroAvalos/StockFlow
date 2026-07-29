package com.stockflow.backend.repository.projection;

import com.stockflow.backend.entity.Product;

public interface BestSellingProduct {
    Product getProduct();
    Long getTotalSold();
}