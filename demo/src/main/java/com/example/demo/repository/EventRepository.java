package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Category;
import com.example.demo.entity.Event;
import com.example.demo.entity.User;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Find all events by category ID
    List<Event> findByCategoryId(Long categoryId);

    // Find all events by organizer ID
    List<Event> findByOrganizerId(Long organizerId);

    // Find events on a specific date
    List<Event> findByEventDate(LocalDate eventDate);

    // Search events by title (case-insensitive)
    List<Event> findByTitleContainingIgnoreCase(String title);

    // Search events by venue (case-insensitive)
    List<Event> findByVenueContainingIgnoreCase(String venue);

    // Find upcoming events
    List<Event> findByEventDateAfter(LocalDate date);

    // Find past events
    List<Event> findByEventDateBefore(LocalDate date);

    // Find events by Category object
    List<Event> findByCategory(Category category);

    // Find events by Organizer object
    List<Event> findByOrganizer(User organizer);

    // Search by title and venue
    List<Event> findByTitleContainingIgnoreCaseAndVenueContainingIgnoreCase(
            String title,
            String venue
    );
}