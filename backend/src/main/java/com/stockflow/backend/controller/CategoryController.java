package com.stockflow.backend.controller;

import com.stockflow.backend.dto.CategoryRequest;
import com.stockflow.backend.dto.CategoryResponse;
import com.stockflow.backend.entity.Category;
import com.stockflow.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(){
        List<CategoryResponse> categories = categoryService.getAllCategories().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id){
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(toResponse(category));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<CategoryResponse> getCategoryByName(@PathVariable String name) {
        Category category = categoryService.getCategoryByName(name);
        return ResponseEntity.ok(toResponse(category));
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest categoryRequest){
        Category category = categoryService.saveCategory(categoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest categoryRequest){
        Category category = categoryService.updateCategory(id, categoryRequest);
        return ResponseEntity.ok(toResponse(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CategoryResponse> deleteCategory(@PathVariable Long id) {
        Category category = categoryService.softDeleteById(id);
        return ResponseEntity.ok(toResponse(category));
    }

    private CategoryResponse toResponse(Category category){
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setActive(category.isActive());
        return categoryResponse;
    }
}