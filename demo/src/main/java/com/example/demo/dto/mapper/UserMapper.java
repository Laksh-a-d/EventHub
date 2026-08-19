package com.example.demo.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.dto.request.UserRequest;
import com.example.demo.dto.response.UserResponse;
import com.example.demo.entity.User;

public class UserMapper {

    private UserMapper() {
    }

    // UserRequest -> User
    public static User toEntity(UserRequest request) {

        if (request == null) {
            return null;
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());

        return user;
    }

    // User -> UserResponse
    public static UserResponse toResponse(User user) {

        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    // List<User> -> List<UserResponse>
    public static List<UserResponse> toResponseList(
            List<User> users) {

        return users.stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }
}