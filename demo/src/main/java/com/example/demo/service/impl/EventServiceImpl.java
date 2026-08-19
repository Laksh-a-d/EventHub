package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.dto.mapper.EventMapper;
import com.example.demo.dto.response.EventResponse;
import com.example.demo.entity.Category;
import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.service.EventService;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // ==========================
    // CRUD Operations
    // ==========================

    @Override
    public EventResponse saveEvent(Event event) {

        Event savedEvent = eventRepository.save(event);

        return EventMapper.toResponse(savedEvent);
    }

    @Override
    public List<EventResponse> getAllEvents() {

        return EventMapper.toResponseList(eventRepository.findAll());
    }

    @Override
    public Page<EventResponse> getAllEvents(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> eventPage = eventRepository.findAll(pageable);

        List<EventResponse> responses =
                EventMapper.toResponseList(eventPage.getContent());

        return new PageImpl<>(
                responses,
                pageable,
                eventPage.getTotalElements());
    }

    @Override
    public EventResponse getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found."));

        return EventMapper.toResponse(event);
    }

    @Override
    public EventResponse updateEvent(Long id, Event event) {

        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found."));

        existingEvent.setTitle(event.getTitle());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setVenue(event.getVenue());
        existingEvent.setEventDate(event.getEventDate());
        existingEvent.setCapacity(event.getCapacity());
        existingEvent.setCategory(event.getCategory());
        existingEvent.setOrganizer(event.getOrganizer());

        Event updatedEvent = eventRepository.save(existingEvent);

        return EventMapper.toResponse(updatedEvent);
    }

    @Override
    public void deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found."));

        eventRepository.delete(event);
    }

    // ==========================
    // Search APIs
    // ==========================

    @Override
    public List<EventResponse> searchByTitle(String title) {

        return EventMapper.toResponseList(
                eventRepository.findByTitleContainingIgnoreCase(title));
    }

    @Override
    public List<EventResponse> searchByVenue(String venue) {

        return EventMapper.toResponseList(
                eventRepository.findByVenueContainingIgnoreCase(venue));
    }

    @Override
    public List<EventResponse> getEventsByCategoryId(Long categoryId) {

        return EventMapper.toResponseList(
                eventRepository.findByCategoryId(categoryId));
    }

    @Override
    public List<EventResponse> getEventsByOrganizerId(Long organizerId) {

        return EventMapper.toResponseList(
                eventRepository.findByOrganizerId(organizerId));
    }

    @Override
    public List<EventResponse> getEventsByCategory(Category category) {

        return EventMapper.toResponseList(
                eventRepository.findByCategory(category));
    }

    @Override
    public List<EventResponse> getEventsByOrganizer(User organizer) {

        return EventMapper.toResponseList(
                eventRepository.findByOrganizer(organizer));
    }

    @Override
    public List<EventResponse> getEventsByDate(LocalDate eventDate) {

        return EventMapper.toResponseList(
                eventRepository.findByEventDate(eventDate));
    }

    @Override
    public List<EventResponse> getUpcomingEvents() {

        return EventMapper.toResponseList(
                eventRepository.findByEventDateAfter(LocalDate.now()));
    }

    @Override
    public List<EventResponse> getPastEvents() {

        return EventMapper.toResponseList(
                eventRepository.findByEventDateBefore(LocalDate.now()));
    }

    @Override
    public List<EventResponse> searchByTitleAndVenue(
            String title,
            String venue) {

        return EventMapper.toResponseList(
                eventRepository.findByTitleContainingIgnoreCaseAndVenueContainingIgnoreCase(
                        title,
                        venue));
    }
}