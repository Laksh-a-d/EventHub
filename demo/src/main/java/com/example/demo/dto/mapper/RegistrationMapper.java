package com.example.demo.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.dto.response.RegistrationResponse;
import com.example.demo.entity.Registration;

public class RegistrationMapper {

    private RegistrationMapper() {
    }

    public static RegistrationResponse toResponse(Registration registration) {

        if (registration == null) {
            return null;
        }

        return new RegistrationResponse(
                registration.getId(),
                UserMapper.toResponse(registration.getUser()),
                EventMapper.toResponse(registration.getEvent()),
                registration.getRegistrationDate(),
                registration.getStatus(),
                registration.getCreatedAt(),
                registration.getUpdatedAt()
        );
    }

    public static List<RegistrationResponse> toResponseList(
            List<Registration> registrations) {

        return registrations.stream()
                .map(RegistrationMapper::toResponse)
                .collect(Collectors.toList());
    }
}