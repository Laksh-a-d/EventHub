package com.example.demo.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dto.response.EventResponse;
import com.example.demo.entity.Event;

@Component
public class EventMapper {

    public static EventResponse toResponse(Event event) {

        if (event == null) {
            return null;
        }

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getVenue(),
                event.getEventDate(),
                event.getCapacity(),
                CategoryMapper.toResponse(event.getCategory()),
                UserMapper.toResponse(event.getOrganizer()),
                event.getCreatedAt(),
                event.getUpdatedAt()
        );
    }

    public static List<EventResponse> toResponseList(List<Event> events) {

        return events.stream()
                .map(EventMapper::toResponse)
                .collect(Collectors.toList());
    }
}