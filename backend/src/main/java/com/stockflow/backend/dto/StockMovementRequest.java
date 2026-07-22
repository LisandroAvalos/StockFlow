package com.stockflow.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class StockMovementRequest {

    @NotNull(message = "El producto es obligatorio")
    private Long productId;

    @Positive(message = "La cantidad debe ser mayor a 0")
    private int quantity;
}
