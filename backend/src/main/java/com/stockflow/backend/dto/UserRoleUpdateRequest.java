package com.stockflow.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class UserRoleUpdateRequest {

    @NotBlank(message = "El role es obligatorio")
    private String roleName;
}
