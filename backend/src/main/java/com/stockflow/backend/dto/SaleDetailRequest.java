package com.stockflow.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class SaleDetailRequest {

    @NotNull(message = "El producto es obligatorio")
    private Long productId;

    @Positive(message = "La cantidad debe ser mayor a 0")
    private int quantity;

    @PositiveOrZero(message = "El descuento no puede ser negativo")
    @DecimalMax(value = "100", message = "El descuento no puede superar el 100%")
    private BigDecimal discount;
}