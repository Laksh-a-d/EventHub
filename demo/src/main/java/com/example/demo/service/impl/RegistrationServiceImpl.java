package com.example.demo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.mapper.RegistrationMapper;
import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Registration;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.service.RegistrationService;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;

    public RegistrationServiceImpl(
            RegistrationRepository registrationRepository) {

        this.registrationRepository = registrationRepository;
    }

    // ==========================================
    // CREATE REGISTRATION
    // ==========================================

    @Override
    public RegistrationResponse saveRegistration(
            Registration registration) {

        if (registration.getUser() == null) {
            throw new RuntimeException("User is required.");
        }

        if (registration.getEvent() == null) {
            throw new RuntimeException("Event is required.");
        }

        boolean alreadyRegistered =
                registrationRepository.existsByUserAndEvent(
                        registration.getUser(),
                        registration.getEvent()
                );

        if (alreadyRegistered) {
            throw new RuntimeException(
                    "User is already registered for this event."
            );
        }

        Registration savedRegistration =
                registrationRepository.save(registration);

        return RegistrationMapper.toResponse(
                savedRegistration
        );
    }

    // ==========================================
    // GET ALL REGISTRATIONS
    // ==========================================

    @Override
    public List<RegistrationResponse> getAllRegistrations() {

        return RegistrationMapper.toResponseList(
                registrationRepository.findAll()
        );
    }

    // ==========================================
    // GET REGISTRATION BY ID
    // ==========================================

    @Override
    public RegistrationResponse getRegistrationById(
            Long id) {

        Registration registration =
                registrationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found."
                                )
                        );

        return RegistrationMapper.toResponse(
                registration
        );
    }

    // ==========================================
    // UPDATE REGISTRATION
    // ==========================================

    @Override
    public RegistrationResponse updateRegistration(
            Long id,
            Registration registration) {

        Registration existingRegistration =
                registrationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found."
                                )
                        );

        if (registration.getUser() == null) {
            throw new RuntimeException("User is required.");
        }

        if (registration.getEvent() == null) {
            throw new RuntimeException("Event is required.");
        }

        existingRegistration.setUser(
                registration.getUser()
        );

        existingRegistration.setEvent(
                registration.getEvent()
        );

        existingRegistration.setRegistrationDate(
                registration.getRegistrationDate()
        );

        existingRegistration.setStatus(
                registration.getStatus()
        );

        Registration updatedRegistration =
                registrationRepository.save(
                        existingRegistration
                );

        return RegistrationMapper.toResponse(
                updatedRegistration
        );
    }

    // ==========================================
    // DELETE REGISTRATION
    // ==========================================

    @Override
    public void deleteRegistration(Long id) {

        Registration registration =
                registrationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Registration not found."
                                )
                        );

        registrationRepository.delete(registration);
    }
}