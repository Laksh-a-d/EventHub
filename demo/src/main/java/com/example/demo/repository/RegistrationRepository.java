package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.enums.RegistrationStatus;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    /**
     * Check if a user has already registered for an event.
     */
    Optional<Registration> findByUserAndEvent(
            User user,
            Event event
    );

    /**
     * Count total registrations for a specific event.
     */
    long countByEvent(Event event);

    /**
     * Get all registrations of a particular user.
     */
    List<Registration> findByUser(User user);

    /**
     * Get all registrations for a particular event.
     */
    List<Registration> findByEvent(Event event);

    /**
     * Check whether a registration exists for a user and event.
     */
    boolean existsByUserAndEvent(
            User user,
            Event event
    );

    /**
     * Count registrations by status.
     */
    long countByEventAndStatus(
            Event event,
            RegistrationStatus status
    );
}