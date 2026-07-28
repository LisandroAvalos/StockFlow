package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.SaleDetailResponse;
import com.stockflow.backend.dto.SaleResponse;
import com.stockflow.backend.entity.Sale;
import com.stockflow.backend.entity.SaleDetail;
import com.stockflow.backend.repository.SaleDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SaleMapper {

    private final ProductMapper productMapper;
    private final SaleDetailRepository saleDetailRepository;

    public SaleResponse toResponse(Sale sale){
        SaleResponse saleResponse = new SaleResponse();
        saleResponse.setId(sale.getId());
        saleResponse.setDate(sale.getDate());
        saleResponse.setTotal(sale.getTotal());
        saleResponse.setTotalDiscount(sale.getTotalDiscount());
        saleResponse.setUserId(sale.getUser().getId());
        saleResponse.setUserName(sale.getUser().getName());

        List<SaleDetailResponse> details = saleDetailRepository.findBySaleId(sale.getId()).stream()
                .map(this::toResponse)
                .toList();
        saleResponse.setDetails(details);

        return saleResponse;
    }

    private SaleDetailResponse toResponse(SaleDetail saleDetail){
        SaleDetailResponse saleDetailResponse = new SaleDetailResponse();
        saleDetailResponse.setId(saleDetail.getId());
        saleDetailResponse.setQuantity(saleDetail.getQuantity());
        saleDetailResponse.setDiscount(saleDetail.getDiscount());
        saleDetailResponse.setUnitPrice(saleDetail.getUnitPrice());
        saleDetailResponse.setProduct(productMapper.toResponse(saleDetail.getProduct()));

        BigDecimal lineTotal = saleDetail.getUnitPrice().multiply(BigDecimal.valueOf(saleDetail.getQuantity()));
        BigDecimal discountAmount = lineTotal.multiply(saleDetail.getDiscount()).divide(BigDecimal.valueOf(100));
        saleDetailResponse.setSubtotal(lineTotal.subtract(discountAmount));

        return saleDetailResponse;
    }
}