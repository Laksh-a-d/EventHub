package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.entity.Category;

public interface CategoryService {

    // Create Category
    CategoryResponse saveCategory(Category category);

    // Get All Categories
    List<CategoryResponse> getAllCategories();

    // Get Category By ID
    CategoryResponse getCategoryById(Long id);

    // Update Category
    CategoryResponse updateCategory(Long id, Category category);

    // Delete Category
    void deleteCategory(Long id);
}