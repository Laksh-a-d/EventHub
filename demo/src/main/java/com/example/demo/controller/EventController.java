package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.response.EventResponse;
import com.example.demo.entity.Event;
import com.example.demo.service.EventService;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ==========================
    // CRUD Operations
    // ==========================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public EventResponse saveEvent(@RequestBody Event event) {

        return eventService.saveEvent(event);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public List<EventResponse> getAllEvents() {

        return eventService.getAllEvents();
    }

    // ==========================
    // Pagination + Sorting
    // ==========================

    @GetMapping("/page")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public Page<EventResponse> getAllEventsWithPagination(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return eventService.getAllEvents(
                page,
                size,
                sortBy,
                direction);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public EventResponse getEventById(
            @PathVariable Long id) {

        return eventService.getEventById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public EventResponse updateEvent(
            @PathVariable Long id,
            @RequestBody Event event) {

        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEvent(
            @PathVariable Long id) {

        eventService.deleteEvent(id);

        return "Event deleted successfully.";
    }

    // ==========================
    // Search APIs
    // ==========================

    @GetMapping("/search/title")
    public List<EventResponse> searchByTitle(
            @RequestParam String title) {

        return eventService.searchByTitle(title);
    }

    @GetMapping("/search/venue")
    public List<EventResponse> searchByVenue(
            @RequestParam String venue) {

        return eventService.searchByVenue(venue);
    }

    @GetMapping("/category/{categoryId}")
    public List<EventResponse> getEventsByCategory(
            @PathVariable Long categoryId) {

        return eventService.getEventsByCategoryId(categoryId);
    }

    @GetMapping("/organizer/{organizerId}")
    public List<EventResponse> getEventsByOrganizer(
            @PathVariable Long organizerId) {

        return eventService.getEventsByOrganizerId(organizerId);
    }

    @GetMapping("/date")
    public List<EventResponse> getEventsByDate(
            @RequestParam LocalDate eventDate) {

        return eventService.getEventsByDate(eventDate);
    }

    @GetMapping("/upcoming")
    public List<EventResponse> getUpcomingEvents() {

        return eventService.getUpcomingEvents();
    }

    @GetMapping("/past")
    public List<EventResponse> getPastEvents() {

        return eventService.getPastEvents();
    }

    @GetMapping("/search")
    public List<EventResponse> searchByTitleAndVenue(
            @RequestParam String title,
            @RequestParam String venue) {

        return eventService.searchByTitleAndVenue(
                title,
                venue);
    }
}