package com.example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.mapper.CategoryMapper;
import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // ==========================
    // Create Category
    // ==========================

    @Override
    public CategoryResponse saveCategory(Category category) {

        if (categoryRepository.existsByName(category.getName())) {
            throw new RuntimeException("Category already exists.");
        }

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(savedCategory);
    }

    // ==========================
    // Get All Categories
    // ==========================

    @Override
    public List<CategoryResponse> getAllCategories() {

        return CategoryMapper.toResponseList(
                categoryRepository.findAll());
    }

    // ==========================
    // Get Category By Id
    // ==========================

    @Override
    public CategoryResponse getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        return CategoryMapper.toResponse(category);
    }

    // ==========================
    // Update Category
    // ==========================

    @Override
    public CategoryResponse updateCategory(
            Long id,
            Category category) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        Category updatedCategory =
                categoryRepository.save(existingCategory);

        return CategoryMapper.toResponse(updatedCategory);
    }

    // ==========================
    // Delete Category
    // ==========================

    @Override
    public void deleteCategory(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found."));

        categoryRepository.delete(category);
    }
}