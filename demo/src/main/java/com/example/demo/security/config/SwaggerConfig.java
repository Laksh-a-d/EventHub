package com.example.demo.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI eventManagementOpenAPI() {

        return new OpenAPI()

                // ==========================================
                // API INFORMATION
                // ==========================================

                .info(new Info()
                        .title("EventHub API")
                        .description(
                                "Event Management System REST APIs\n\n" +
                                "Features:\n" +
                                "- JWT Authentication\n" +
                                "- Role Based Authorization\n" +
                                "- User Management\n" +
                                "- Event Management\n" +
                                "- Category Management\n" +
                                "- Registration Management\n" +
                                "- Dashboard APIs"
                        )
                        .version("1.0.0")

                        .contact(new Contact()
                                .name("Ritesh Nayase")
                                .email("ritesh@gmail.com"))

                        .license(new License()
                                .name("Apache 2.0")
                                .url(
                                    "https://www.apache.org/licenses/LICENSE-2.0"
                                )
                        )
                )

                // ==========================================
                // JWT SECURITY
                // ==========================================

                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "Bearer Authentication",
                                        new SecurityScheme()
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                                .description(
                                                        "Enter JWT token as: Bearer <token>"
                                                )
                                )
                )

                // ==========================================
                // APPLY JWT SECURITY
                // ==========================================

                .addSecurityItem(
                        new SecurityRequirement()
                                .addList("Bearer Authentication")
                )

                // ==========================================
                // EXTERNAL DOCUMENTATION
                // ==========================================

                .externalDocs(
                        new ExternalDocumentation()
                                .description("Project Documentation")
                                .url("https://github.com/")
                );
    }
}