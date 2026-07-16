package com.stockflow.backend.mapper;

import com.stockflow.backend.dto.CategoryResponse;
import com.stockflow.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryResponse toResponse(Category category){
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setActive(category.isActive());
        return categoryResponse;
    }
}
