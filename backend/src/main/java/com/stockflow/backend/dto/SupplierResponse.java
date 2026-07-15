package com.stockflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class SupplierResponse {

    private Long id;
    private String name;
    private String telephone;
    private String email;
    private boolean active;
}
