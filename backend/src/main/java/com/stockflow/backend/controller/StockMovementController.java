package com.stockflow.backend.controller;

import com.stockflow.backend.dto.StockMovementRequest;
import com.stockflow.backend.dto.StockMovementResponse;
import com.stockflow.backend.entity.StockMovement;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.mapper.StockMovementMapper;
import com.stockflow.backend.service.StockMovementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockMovementController {

    private final StockMovementService stockMovementService;
    private final StockMovementMapper stockMovementMapper;

    @GetMapping
    public ResponseEntity<List<StockMovementResponse>> getAllMovements(){
        List<StockMovementResponse> movements = stockMovementService.getAllMovements().stream()
                .map(stockMovementMapper::toResponse)
                .toList();
        return ResponseEntity.ok(movements);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByProduct(@PathVariable Long productId){
        List<StockMovementResponse> movements = stockMovementService.getMovementsByProduct(productId).stream()
                .map(stockMovementMapper::toResponse)
                .toList();
        return ResponseEntity.ok(movements);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByUser(@PathVariable Long userId){
        List<StockMovementResponse> movements = stockMovementService.getMovementsByUser(userId).stream()
                .map(stockMovementMapper::toResponse)
                .toList();
        return ResponseEntity.ok(movements);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByType(@PathVariable StockMovement.StockMovementType type){
        List<StockMovementResponse> movements = stockMovementService.getMovementsByType(type).stream()
                .map(stockMovementMapper::toResponse)
                .toList();
        return ResponseEntity.ok(movements);
    }

    @GetMapping("/date")
    public ResponseEntity<List<StockMovementResponse>> getMovementsByDateRange(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end){
        List<StockMovementResponse> movements = stockMovementService.getMovementsByDateRange(start, end).stream()
                .map(stockMovementMapper::toResponse)
                .toList();
        return ResponseEntity.ok(movements);
    }

    @PostMapping("/entry")
    public ResponseEntity<StockMovementResponse> registerEntry(@Valid @RequestBody StockMovementRequest request, Authentication authentication){

        User user = (User) authentication.getPrincipal();
        StockMovement stockMovement = stockMovementService.registerEntry(request, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(stockMovementMapper.toResponse(stockMovement));
    }

    @PostMapping("/adjust/positive")
    public ResponseEntity<StockMovementResponse> adjustPositive(@Valid @RequestBody StockMovementRequest request, Authentication authentication){

        User user = (User) authentication.getPrincipal();
        StockMovement stockMovement = stockMovementService.adjustStockPositive(request, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(stockMovementMapper.toResponse(stockMovement));
    }

    @PostMapping("/adjust/negative")
    public ResponseEntity<StockMovementResponse> adjustNegative(@Valid @RequestBody StockMovementRequest request, Authentication authentication){

        User user = (User) authentication.getPrincipal();
        StockMovement stockMovement = stockMovementService.adjustStockNegative(request, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(stockMovementMapper.toResponse(stockMovement));
    }
}
