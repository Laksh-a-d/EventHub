package com.example.demo.security.service;

import com.example.demo.dto.request.AuthRequest;
import com.example.demo.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse login(AuthRequest request);

}