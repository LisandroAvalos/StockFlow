package com.stockflow.backend.service;

import com.stockflow.backend.dto.BestSellingProductResponse;
import com.stockflow.backend.dto.SaleDetailRequest;
import com.stockflow.backend.dto.SaleRequest;
import com.stockflow.backend.entity.Product;
import com.stockflow.backend.entity.Sale;
import com.stockflow.backend.entity.SaleDetail;
import com.stockflow.backend.entity.User;
import com.stockflow.backend.exception.ResourceNotFoundException;
import com.stockflow.backend.mapper.ProductMapper;
import com.stockflow.backend.repository.SaleDetailRepository;
import com.stockflow.backend.repository.SaleRepository;
import com.stockflow.backend.repository.projection.BestSellingProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleDetailRepository saleDetailRepository;
    private final ProductService productService;
    private final StockMovementService stockMovementService;
    private final ProductMapper productMapper;

    @Transactional
    public Sale createSale (SaleRequest request, User user){
        Sale sale = new Sale();
        sale.setUser(user);
        sale.setTotal(BigDecimal.ZERO);
        sale.setTotalDiscount(BigDecimal.ZERO);

        List<SaleDetail> details = new ArrayList<>();

        for(SaleDetailRequest requestDetail : request.getDetails()){
            Product product = productService.getProductById(requestDetail.getProductId());
            SaleDetail saleDetail = buildSaleDetail(requestDetail, product);

            BigDecimal localTotal = saleDetail.getUnitPrice().multiply(BigDecimal.valueOf(saleDetail.getQuantity()));
            BigDecimal discountAmount = localTotal.multiply(saleDetail.getDiscount()).divide(BigDecimal.valueOf(100));

            sale.setTotal(sale.getTotal().add(localTotal).subtract(discountAmount));
            sale.setTotalDiscount(sale.getTotalDiscount().add(discountAmount));

            details.add(saleDetail);

            stockMovementService.registerSale(product, saleDetail.getQuantity(), user);
        }

        sale = saleRepository.save(sale);

        for(SaleDetail detail : details){
            detail.setSale(sale);
            saleDetailRepository.save(detail);
        }

        return sale;
    }

    private SaleDetail buildSaleDetail(SaleDetailRequest request, Product product){
        SaleDetail saleDetail = new SaleDetail();
        saleDetail.setQuantity(request.getQuantity());
        saleDetail.setProduct(product);
        saleDetail.setDiscount(request.getDiscount() != null ? request.getDiscount() : BigDecimal.ZERO);
        saleDetail.setUnitPrice(product.getOfferPrice() != null ? product.getOfferPrice() : product.getPrice());
        return saleDetail;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getSaleById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con id: " + id));
    }

    public List<Sale> getSalesByUser(Long userId) {
        return saleRepository.findByUserId(userId);
    }

    public List<Sale> getSalesByDateRange(LocalDateTime start, LocalDateTime end) {
        return saleRepository.findByDateBetween(start, end);
    }

    public List<SaleDetail> getDetailsByProductId(Long productId) {
        return saleDetailRepository.findByProductId(productId);
    }

    public List<BestSellingProductResponse> getBestSellingProducts() {
        List<BestSellingProduct> results = saleDetailRepository.findMostSoldProducts(PageRequest.of(0, 10));

        return results.stream()
                .map(result -> new BestSellingProductResponse(
                        productMapper.toResponse(result.getProduct()),
                        result.getTotalSold()
                ))
                .toList();
    }
}