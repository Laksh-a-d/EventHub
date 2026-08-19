package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalUsers;

    private long totalCategories;

    private long totalEvents;

    private long totalRegistrations;

    private long upcomingEvents;

}