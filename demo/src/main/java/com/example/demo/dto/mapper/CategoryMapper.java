package com.example.demo.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.dto.response.CategoryResponse;
import com.example.demo.entity.Category;

public class CategoryMapper {

    private CategoryMapper() {
    }

    public static CategoryResponse toResponse(Category category) {

        if (category == null) {
            return null;
        }

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }

    public static List<CategoryResponse> toResponseList(List<Category> categories) {

        return categories.stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
    }
}