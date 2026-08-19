package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.response.UserResponse;
import com.example.demo.entity.User;

public interface UserService {

    // Create User
    UserResponse saveUser(User user);

    // Get All Users
    List<UserResponse> getAllUsers();

    // Get User By ID
    UserResponse getUserById(Long id);

    // Update User
    UserResponse updateUser(Long id, User user);

    // Delete User
    void deleteUser(Long id);
}