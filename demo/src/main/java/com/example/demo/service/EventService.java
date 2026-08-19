package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;

import com.example.demo.dto.response.EventResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Event;
import com.example.demo.entity.User;

public interface EventService {

    // ==========================
    // CRUD Operations
    // ==========================

    EventResponse saveEvent(Event event);

    List<EventResponse> getAllEvents();

    Page<EventResponse> getAllEvents(
            int page,
            int size,
            String sortBy,
            String direction);

    EventResponse getEventById(Long id);

    EventResponse updateEvent(Long id, Event event);

    void deleteEvent(Long id);

    // ==========================
    // Search APIs
    // ==========================

    List<EventResponse> searchByTitle(String title);

    List<EventResponse> searchByVenue(String venue);

    List<EventResponse> getEventsByCategoryId(Long categoryId);

    List<EventResponse> getEventsByOrganizerId(Long organizerId);

    List<EventResponse> getEventsByCategory(Category category);

    List<EventResponse> getEventsByOrganizer(User organizer);

    List<EventResponse> getEventsByDate(LocalDate eventDate);

    List<EventResponse> getUpcomingEvents();

    List<EventResponse> getPastEvents();

    List<EventResponse> searchByTitleAndVenue(
            String title,
            String venue);
}