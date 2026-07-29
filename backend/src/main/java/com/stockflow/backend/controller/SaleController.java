package com.stockflow.backend.controller;

import com.stockflow.backend.dto.BestSellingProductResponse;
import com.stockflow.backend.dto.SaleRequest;
import com.stockflow.backend.dto.SaleResponse;
import com.stockflow.backend.entity.Sale;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.mapper.SaleMapper;
import com.stockflow.backend.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;
    private final SaleMapper saleMapper;

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAllSales(){
        List<SaleResponse> responses = saleService.getAllSales().stream()
                .map(saleMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleResponse> getSaleById(@PathVariable Long id){
        Sale sale = saleService.getSaleById(id);
        return ResponseEntity.ok(saleMapper.toResponse(sale));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SaleResponse>> getSalesByUser(@PathVariable Long userId){
        List<SaleResponse> responses = saleService.getSalesByUser(userId).stream()
                .map(saleMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/date")
    public ResponseEntity<List<SaleResponse>> getSalesByDateRange(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end){
        List<SaleResponse> responses = saleService.getSalesByDateRange(start, end).stream()
                .map(saleMapper::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/best-selling")
    public ResponseEntity<List<BestSellingProductResponse>> getBestSellingProducts(){
        return ResponseEntity.ok(saleService.getBestSellingProducts());
    }

    @PostMapping
    public ResponseEntity<SaleResponse> createSale(@Valid @RequestBody SaleRequest request, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        Sale sale = saleService.createSale(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saleMapper.toResponse(sale));
    }
}