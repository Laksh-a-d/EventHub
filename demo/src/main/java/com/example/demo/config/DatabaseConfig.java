package com.example.demo.config;

import java.net.URI;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String datasourceUsername;

    @Value("${spring.datasource.password}")
    private String datasourcePassword;

    @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        String finalUrl = datasourceUrl;
        String finalUsername = datasourceUsername;
        String finalPassword = datasourcePassword;

        // Auto-convert standard cloud postgresql:// or postgres:// URI format into jdbc:postgresql://
        if (finalUrl != null && (finalUrl.startsWith("postgresql://") || finalUrl.startsWith("postgres://"))) {
            try {
                URI dbUri = new URI(finalUrl);
                String userInfo = dbUri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] userParts = userInfo.split(":", 2);
                    finalUsername = userParts[0];
                    finalPassword = userParts[1];
                }
                int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                String path = dbUri.getPath();
                if (path != null && path.startsWith("/")) {
                    path = path.substring(1);
                }
                finalUrl = "jdbc:postgresql://" + dbUri.getHost() + ":" + port + "/" + path;
                if (dbUri.getQuery() != null && !dbUri.getQuery().isEmpty()) {
                    finalUrl += "?" + dbUri.getQuery();
                }
            } catch (Exception e) {
                // Fallback to original
            }
        }

        return DataSourceBuilder.create()
                .driverClassName(driverClassName)
                .url(finalUrl)
                .username(finalUsername)
                .password(finalPassword)
                .build();
    }
}
