package com.stockflow.backend.service;

import com.stockflow.backend.dto.CategoryRequest;
import com.stockflow.backend.entity.Category;
import com.stockflow.backend.exception.ResourceNotFoundException;
import com.stockflow.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories(){
        return categoryRepository.findByActiveTrue();
    }

    public Category getCategoryById(Long id){
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: "+id));
    }

    public Category getCategoryByName(String name){
        return  categoryRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con nombre: "+name));
    }

    public Category saveCategory(CategoryRequest categoryRequest){
        Category category = new Category();
        category.setName(categoryRequest.getName());
        category.setActive(true);

        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryRequest categoryRequest){
        Category category = getCategoryById(id);
        category.setName(categoryRequest.getName());

        return categoryRepository.save(category);
    }

    public Category softDeleteById(Long id){
        Category category = getCategoryById(id);
        category.setActive(false);

        return categoryRepository.save(category);
    }
}
