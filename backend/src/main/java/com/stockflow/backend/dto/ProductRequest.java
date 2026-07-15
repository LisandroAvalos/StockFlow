package com.stockflow.backend.dto;

import jakarta.validation.constraints.NotBlank;
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
public class ProductRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "El codigo es obligatorio")
    private String code;

    @NotBlank(message = "La descripcion es obligatoria")
    private String description;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser mayor a 0")
    private BigDecimal price;

    private BigDecimal offerPrice;

    @PositiveOrZero(message = "El stock debe ser mayor o igual a 0")
    private int stock;

    @PositiveOrZero(message = "El stock minimo debe ser mayor o igual a 0")
    private int minStock;

    @NotNull(message = "La categoria es obligatoria")
    private Long categoryId;

    @NotNull(message = "El proveedor es obligatorio")
    private Long supplierId;
}
