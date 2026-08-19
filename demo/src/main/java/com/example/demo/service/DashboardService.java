package com.example.demo.service;

import com.example.demo.dto.response.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard();

    long getTotalUsers();

    long getTotalCategories();

    long getTotalEvents();

    long getTotalRegistrations();

    long getRegistrationCountByEvent(Long eventId);

}