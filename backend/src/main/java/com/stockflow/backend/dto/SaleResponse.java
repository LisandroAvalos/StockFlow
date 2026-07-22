package com.stockflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class SaleResponse {

    private Long id;
    private LocalDateTime date;
    private BigDecimal total;
    private BigDecimal totalDiscount;
    private Long userId;
    private String userName;
    private List<SaleDetailResponse> details;
}