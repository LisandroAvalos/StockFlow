package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.StockMovementResponse;
import com.stockflow.backend.entity.StockMovement;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StockMovementMapper {

    private final ProductMapper productMapper;

    public StockMovementResponse toResponse(StockMovement movement) {
        StockMovementResponse response = new StockMovementResponse();
        response.setId(movement.getId());
        response.setType(movement.getType());
        response.setQuantity(movement.getQuantity());
        response.setDate(movement.getDate());
        response.setProduct(productMapper.toResponse(movement.getProduct()));
        response.setUserId(movement.getUser().getId());
        response.setUserName(movement.getUser().getName());
        return response;
    }
}