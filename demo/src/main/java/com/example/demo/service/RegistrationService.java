package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Registration;

public interface RegistrationService {

    // Create Registration
    RegistrationResponse saveRegistration(Registration registration);

    // Create Registration for authenticated user
    RegistrationResponse saveRegistration(Registration registration, String currentUserEmail);

    // Get All Registrations
    List<RegistrationResponse> getAllRegistrations();

    // Get My Registrations for authenticated user
    List<RegistrationResponse> getMyRegistrations(String userEmail);

    // Get Registration By ID
    RegistrationResponse getRegistrationById(Long id);

    // Update Registration
    RegistrationResponse updateRegistration(
            Long id,
            Registration registration
    );

    // Delete Registration
    void deleteRegistration(Long id);
}