package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.ProductResponse;
import com.stockflow.backend.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CategoryMapper categoryMapper;
    private final SupplierMapper supplierMapper;

    public ProductResponse toResponse(Product product){
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setCode(product.getCode());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setOfferPrice(product.getOfferPrice());
        productResponse.setStock(product.getStock());
        productResponse.setMinStock(product.getMinStock());
        productResponse.setActive(product.isActive());
        productResponse.setCategory(categoryMapper.toResponse(product.getCategory()));
        productResponse.setSupplier(supplierMapper.toResponse(product.getSupplier()));

        return productResponse;
    }
}
