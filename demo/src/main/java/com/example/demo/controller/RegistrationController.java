package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Registration;
import com.example.demo.service.RegistrationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {

        this.registrationService = registrationService;
    }

    // ==========================================
    // CREATE REGISTRATION
    // ==========================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<RegistrationResponse> saveRegistration(
            @Valid @RequestBody Registration registration) {

        RegistrationResponse savedRegistration =
                registrationService.saveRegistration(registration);

        return new ResponseEntity<>(
                savedRegistration,
                HttpStatus.CREATED
        );
    }

    // ==========================================
    // GET ALL REGISTRATIONS
    // ==========================================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RegistrationResponse>>
            getAllRegistrations() {

        return ResponseEntity.ok(
                registrationService.getAllRegistrations()
        );
    }

    // ==========================================
    // GET REGISTRATION BY ID
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RegistrationResponse>
            getRegistrationById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                registrationService.getRegistrationById(id)
        );
    }

    // ==========================================
    // UPDATE REGISTRATION
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<RegistrationResponse>
            updateRegistration(
                    @PathVariable Long id,
                    @Valid @RequestBody Registration registration) {

        return ResponseEntity.ok(
                registrationService.updateRegistration(
                        id,
                        registration
                )
        );
    }

    // ==========================================
    // DELETE REGISTRATION
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<String> deleteRegistration(
            @PathVariable Long id) {

        registrationService.deleteRegistration(id);

        return ResponseEntity.ok(
                "Registration deleted successfully."
        );
    }
}