package com.stockflow.backend.dto;

import com.stockflow.backend.entity.Product;
import com.stockflow.backend.entity.StockMovement;
import com.stockflow.backend.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class StockMovementResponse {

    private Long id;
    private StockMovement.StockMovementType type;
    private int quantity;
    private LocalDateTime date;
    private ProductResponse product;
    private Long userId;
    private String userName;
}
