package com.example.demo.security.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.security.jwt.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n================ JWT FILTER =================");

        // Authorization Header
        final String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization Header : " + authHeader);

        // If no token is present, continue
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer Token Found");
            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT
        String jwt = authHeader.substring(7);

        System.out.println("JWT Token : " + jwt);

        try {

            // Extract Username
            String username = jwtService.extractUsername(jwt);

            System.out.println("Username : " + username);

            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println("User Found : " + userDetails.getUsername());
                System.out.println("Authorities : " + userDetails.getAuthorities());

                if (jwtService.isTokenValid(jwt, username)) {

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(authenticationToken);

                    System.out.println("Authentication SUCCESS");
                } else {

                    System.out.println("Token is INVALID");
                }
            }

        } catch (Exception e) {

            System.out.println("JWT ERROR : " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("=============================================\n");

        filterChain.doFilter(request, response);
    }
}