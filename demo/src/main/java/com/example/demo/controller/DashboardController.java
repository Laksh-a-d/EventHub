package com.example.demo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.response.DashboardResponse;
import com.example.demo.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ==========================
    // Dashboard Summary
    // ==========================
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboard();
    }

    // ==========================
    // Total Users
    // ==========================
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public long getTotalUsers() {
        return dashboardService.getTotalUsers();
    }

    // ==========================
    // Total Categories
    // ==========================
    @GetMapping("/categories")
    @PreAuthorize("hasRole('ADMIN')")
    public long getTotalCategories() {
        return dashboardService.getTotalCategories();
    }

    // ==========================
    // Total Events
    // ==========================
    @GetMapping("/events")
    @PreAuthorize("hasRole('ADMIN')")
    public long getTotalEvents() {
        return dashboardService.getTotalEvents();
    }

    // ==========================
    // Total Registrations
    // ==========================
    @GetMapping("/registrations")
    @PreAuthorize("hasRole('ADMIN')")
    public long getTotalRegistrations() {
        return dashboardService.getTotalRegistrations();
    }

    // ==========================
    // Registration Count by Event
    // ==========================
    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasRole('ADMIN')")
    public long getRegistrationCountByEvent(@PathVariable Long eventId) {
        return dashboardService.getRegistrationCountByEvent(eventId);
    }
}