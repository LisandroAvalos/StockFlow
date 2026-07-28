package com.stockflow.backend.service;

import com.stockflow.backend.dto.ProductCreateRequest;
import com.stockflow.backend.dto.StockMovementRequest;
import com.stockflow.backend.entity.Product;
import com.stockflow.backend.entity.StockMovement;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.repository.StockMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final ProductService productService;

    public StockMovement registerEntry(StockMovementRequest request, User user){
        Product product = productService.getProductById(request.getProductId());

        product.setStock(product.getStock() + request.getQuantity());
        productService.save(product);

        StockMovement movement = buildMovement(request.getQuantity(), product, user, StockMovement.StockMovementType.COMPRA);
        return stockMovementRepository.save(movement);
    }

    public StockMovement registerSale(Product product, int quantity, User user){
        if (product.getStock() < quantity) {
            throw new IllegalArgumentException("Stock insuficiente para completar la venta del producto: " + product.getName());
        }

        product.setStock(product.getStock() - quantity);
        productService.save(product);

        StockMovement movement = buildMovement(quantity, product, user, StockMovement.StockMovementType.VENTA);
        return stockMovementRepository.save(movement);
    }

    public StockMovement adjustStockPositive(StockMovementRequest request, User user) {
        Product product = productService.getProductById(request.getProductId());
        product.setStock(product.getStock() + request.getQuantity());
        productService.save(product);

        StockMovement movement = buildMovement(request.getQuantity(), product, user, StockMovement.StockMovementType.AJUSTE_POSITIVO);
        return stockMovementRepository.save(movement);
    }

    public StockMovement adjustStockNegative(StockMovementRequest request, User user) {
        Product product = productService.getProductById(request.getProductId());

        if (product.getStock() < request.getQuantity()) {
            throw new IllegalArgumentException("Stock insuficiente para realizar el ajuste");
        }

        product.setStock(product.getStock() - request.getQuantity());
        productService.save(product);

        StockMovement movement = buildMovement(request.getQuantity(), product, user, StockMovement.StockMovementType.AJUSTE_NEGATIVO);
        return stockMovementRepository.save(movement);
    }

    @Transactional
    public Product createProductWithInitialStock(ProductCreateRequest request, User user) {
        Product product = productService.saveProduct(request);

        if (request.getInitialStock() > 0) {
            StockMovementRequest stockRequest = new StockMovementRequest(product.getId(), request.getInitialStock());
            registerEntry(stockRequest, user);
        }

        return productService.getProductById(product.getId());
    }

    private StockMovement buildMovement(int quantity, Product product, User user, StockMovement.StockMovementType type) {
        StockMovement movement = new StockMovement();
        movement.setQuantity(quantity);
        movement.setType(type);
        movement.setProduct(product);
        movement.setUser(user);
        return movement;
    }

    public List<StockMovement> getAllMovements() {
        return stockMovementRepository.findAll();
    }

    public List<StockMovement> getMovementsByProduct(Long productId) {
        return stockMovementRepository.findByProductId(productId);
    }

    public List<StockMovement> getMovementsByUser(Long userId) {
        return stockMovementRepository.findByUserId(userId);
    }

    public List<StockMovement> getMovementsByType(StockMovement.StockMovementType type) {
        return stockMovementRepository.findByType(type);
    }

    public List<StockMovement> getMovementsByDateRange(LocalDateTime start, LocalDateTime end) {
        return stockMovementRepository.findByDateBetween(start, end);
    }
}
