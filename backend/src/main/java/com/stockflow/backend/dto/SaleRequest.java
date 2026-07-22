package com.stockflow.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class SaleRequest {

    @NotEmpty(message = "La venta debe tener al menos un detalle")
    @Valid
    private List<SaleDetailRequest> details;
}