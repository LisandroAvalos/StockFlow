package com.stockflow.backend.service;

import com.stockflow.backend.dto.ProductRequest;
import com.stockflow.backend.entity.Category;
import com.stockflow.backend.entity.Product;
import com.stockflow.backend.entity.Supplier;
import com.stockflow.backend.exception.ResourceNotFoundException;
import com.stockflow.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final SupplierService supplierService;

    public List<Product> getAllProducts(){
        return productRepository.findByActiveTrue();
    }

    public Product getProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: "+id));
    }

    public List<Product> getProductsByName(String name){
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getProductsByCategoryId(Long categoryId){
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsBySupplierId(Long supplierId){
        return productRepository.findBySupplierId(supplierId);
    }

    public Product getProductByCode(String code){
        return productRepository.findByCode(code.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con codigo: "+code));
    }

    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice){
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public List<Product> getLowStockProducts(){
        return productRepository.findLowStockProducts();
    }

    public  Product saveProduct(ProductRequest productRequest){

        Category category = categoryService.getCategoryById(productRequest.getCategoryId());
        Supplier supplier = supplierService.getSupplierById(productRequest.getSupplierId());

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setCode(productRequest.getCode().toUpperCase());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setOfferPrice(productRequest.getOfferPrice());
        product.setStock(productRequest.getStock());
        product.setMinStock(productRequest.getMinStock());
        product.setCategory(category);
        product.setSupplier(supplier);

        return productRepository.save(product);
    }

    public  Product updateProduct(Long productId,ProductRequest productRequest){

        Category category = categoryService.getCategoryById(productRequest.getCategoryId());
        Supplier supplier = supplierService.getSupplierById(productRequest.getSupplierId());

        Product product = getProductById(productId);
        product.setName(productRequest.getName());
        product.setCode(productRequest.getCode().toUpperCase());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setOfferPrice(productRequest.getOfferPrice());
        product.setStock(productRequest.getStock());
        product.setMinStock(productRequest.getMinStock());
        product.setCategory(category);
        product.setSupplier(supplier);

        return productRepository.save(product);
    }

    public Product softDeleteById(Long id){
        Product product = getProductById(id);
        product.setActive(false);

        return productRepository.save(product);
    }
}
