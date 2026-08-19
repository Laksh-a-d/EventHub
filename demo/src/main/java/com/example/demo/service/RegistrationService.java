package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Registration;

public interface RegistrationService {

    // Create Registration
    RegistrationResponse saveRegistration(Registration registration);

    // Get All Registrations
    List<RegistrationResponse> getAllRegistrations();

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