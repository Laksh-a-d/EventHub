package com.example.demo.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.security.filter.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

            // ==========================================
            // CORS
            // Uses corsConfigurationSource() from CorsConfig
            // ==========================================
            .cors(Customizer.withDefaults())

            // ==========================================
            // CSRF
            // ==========================================
            .csrf(csrf -> csrf.disable())

            // ==========================================
            // SESSION MANAGEMENT
            // JWT = STATELESS
            // ==========================================
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // ==========================================
            // AUTHORIZATION
            // ==========================================
            .authorizeHttpRequests(auth -> auth

                // --------------------------------------
                // PUBLIC APIs
                // --------------------------------------
                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // --------------------------------------
                // CURRENT USER PROFILE
                // --------------------------------------
                .requestMatchers(
                    "/api/users/me"
                ).hasAnyRole("ADMIN", "STUDENT")

                // --------------------------------------
                // ADMIN ONLY
                // --------------------------------------
                .requestMatchers(
                    "/api/users/**",
                    "/api/categories/**",
                    "/api/dashboard/**"
                ).hasRole("ADMIN")

                // --------------------------------------
                // ADMIN + STUDENT
                // --------------------------------------
                .requestMatchers(
                    "/api/events/**",
                    "/api/registrations/**"
                ).hasAnyRole("ADMIN", "STUDENT")

                // --------------------------------------
                // EVERYTHING ELSE
                // --------------------------------------
                .anyRequest().authenticated()
            )

            // ==========================================
            // JWT FILTER
            // ==========================================
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            // ==========================================
            // HTTP BASIC
            // ==========================================
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // ==========================================
    // PASSWORD ENCODER
    // ==========================================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ==========================================
    // AUTHENTICATION MANAGER
    // ==========================================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}