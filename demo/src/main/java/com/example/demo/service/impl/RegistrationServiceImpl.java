package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.mapper.RegistrationMapper;
import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.enums.RegistrationStatus;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.RegistrationService;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public RegistrationServiceImpl(
            RegistrationRepository registrationRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {

        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    // ==========================================
    // CREATE REGISTRATION
    // ==========================================

    @Override
    public RegistrationResponse saveRegistration(
            Registration registration) {
        return saveRegistration(registration, null);
    }

    @Override
    public RegistrationResponse saveRegistration(
            Registration registration,
            String currentUserEmail) {

        User user = null;

        if (currentUserEmail != null && !currentUserEmail.isBlank()) {
            user = userRepository.findByEmail(currentUserEmail)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "User not found with email: " + currentUserEmail
                            )
                    );
        } else if (registration.getUser() != null && registration.getUser().getId() != null) {
            user = userRepository.findById(registration.getUser().getId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "User not found with id: " + registration.getUser().getId()
                            )
                    );
        } else {
            throw new BadRequestException("User is required for registration.");
        }

        if (registration.getEvent() == null || registration.getEvent().getId() == null) {
            throw new BadRequestException("Event is required for registration.");
        }

        Event event = eventRepository.findById(registration.getEvent().getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with id: " + registration.getEvent().getId()
                        )
                );

        boolean alreadyRegistered =
                registrationRepository.existsByUserAndEvent(
                        user,
                        event
                );

        if (alreadyRegistered) {
            throw new DuplicateResourceException(
                    "You are already registered for this event."
            );
        }

        if (event.getCapacity() != null && event.getCapacity() > 0) {
            long currentRegistrations = registrationRepository.countByEventAndStatus(
                    event,
                    RegistrationStatus.REGISTERED
            );
            if (currentRegistrations >= event.getCapacity()) {
                throw new BadRequestException(
                        "Event has reached maximum capacity (" + event.getCapacity() + ")."
                );
            }
        }

        Registration toSave = new Registration(
                user,
                event,
                registration.getRegistrationDate() != null ? registration.getRegistrationDate() : LocalDate.now(),
                registration.getStatus() != null ? registration.getStatus() : RegistrationStatus.REGISTERED
        );

        Registration savedRegistration =
                registrationRepository.save(toSave);

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
    // GET MY REGISTRATIONS
    // ==========================================

    @Override
    public List<RegistrationResponse> getMyRegistrations(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + userEmail
                        )
                );

        return RegistrationMapper.toResponseList(
                registrationRepository.findByUser(user)
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
                                new ResourceNotFoundException(
                                        "Registration not found with id: " + id
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
                                new ResourceNotFoundException(
                                        "Registration not found with id: " + id
                                )
                        );

        if (registration.getStatus() != null) {
            existingRegistration.setStatus(
                    registration.getStatus()
            );
        }

        if (registration.getRegistrationDate() != null) {
            existingRegistration.setRegistrationDate(
                    registration.getRegistrationDate()
            );
        }

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
                                new ResourceNotFoundException(
                                        "Registration not found with id: " + id
                                )
                        );

        registrationRepository.delete(registration);
    }
}