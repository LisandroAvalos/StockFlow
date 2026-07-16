package com.stockflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProductResponse {

    private Long id;
    private String name;
    private String code;
    private String description;
    private BigDecimal price;
    private BigDecimal offerPrice;
    private int stock;
    private int minStock;
    private boolean active;
    private CategoryResponse category;
    private SupplierResponse supplier;
}
