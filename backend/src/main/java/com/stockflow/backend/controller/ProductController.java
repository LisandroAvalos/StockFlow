package com.stockflow.backend.controller;

import com.stockflow.backend.dto.ProductRequest;
import com.stockflow.backend.dto.ProductResponse;
import com.stockflow.backend.entity.Product;
import com.stockflow.backend.mapper.ProductMapper;
import com.stockflow.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts().stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(productMapper.toResponse(product));
    }

    @GetMapping("/name")
    public ResponseEntity<List<ProductResponse>> getProductsByName(@RequestParam String name){
        List<ProductResponse> products = productService.getProductsByName(name).stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategoryId(@PathVariable Long categoryId){
        List<ProductResponse> products = productService.getProductsByCategoryId(categoryId).stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/supplier/{supplierId}")
    public ResponseEntity<List<ProductResponse>> getProductsBySupplierId(@PathVariable Long supplierId){
        List<ProductResponse> products = productService.getProductsBySupplierId(supplierId).stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ProductResponse> getProductByCode(@PathVariable String code){
        Product product = productService.getProductByCode(code);
        return ResponseEntity.ok(productMapper.toResponse(product));
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<ProductResponse>> getProductsByPriceRange(@RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        List<ProductResponse> products = productService.getProductsByPriceRange(minPrice, maxPrice).stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStockProducts(){
        List<ProductResponse> products = productService.getLowStockProducts().stream()
                .map(productMapper::toResponse)
                .toList();
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest productRequest){
        Product product = productService.saveProduct(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(productMapper.toResponse(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest productRequest){
        Product product = productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(productMapper.toResponse(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable Long id) {
        Product product = productService.softDeleteById(id);
        return ResponseEntity.ok(productMapper.toResponse(product));
    }
}