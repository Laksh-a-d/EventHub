package com.example.demo.service.impl;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.example.demo.dto.response.DashboardResponse;
import com.example.demo.entity.Event;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            EventRepository eventRepository,
            RegistrationRepository registrationRepository) {

        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        long totalUsers = userRepository.count();
        long totalCategories = categoryRepository.count();
        long totalEvents = eventRepository.count();
        long totalRegistrations = registrationRepository.count();

        long upcomingEvents =
                eventRepository.findByEventDateAfter(LocalDate.now()).size();

        return new DashboardResponse(
                totalUsers,
                totalCategories,
                totalEvents,
                totalRegistrations,
                upcomingEvents);
    }

    @Override
    public long getTotalUsers() {
        return userRepository.count();
    }

    @Override
    public long getTotalCategories() {
        return categoryRepository.count();
    }

    @Override
    public long getTotalEvents() {
        return eventRepository.count();
    }

    @Override
    public long getTotalRegistrations() {
        return registrationRepository.count();
    }

    @Override
    public long getRegistrationCountByEvent(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found."));

        return registrationRepository.countByEvent(event);
    }
}