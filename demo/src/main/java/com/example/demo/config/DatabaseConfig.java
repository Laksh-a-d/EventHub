package com.example.demo.config;

import java.net.URI;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${spring.datasource.url:#{null}}")
    private String propertyUrl;

    @Value("${spring.datasource.username:#{null}}")
    private String propertyUsername;

    @Value("${spring.datasource.password:#{null}}")
    private String propertyPassword;

    @Value("${spring.datasource.driver-class-name:org.postgresql.Driver}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        String rawUrl = null;
        String username = null;
        String password = null;

        // 1. Direct environment variable lookup (Railway & Cloud priority)
        String envDbUrl = getFirstNonEmptyEnv(
                "DATABASE_URL",
                "DATABASE_PUBLIC_URL",
                "DATABASE_PRIVATE_URL",
                "SPRING_DATASOURCE_URL"
        );

        if (envDbUrl != null && !envDbUrl.trim().isEmpty()) {
            rawUrl = envDbUrl.trim();
            log.info("Detected database URL from environment variable");
        } else if (System.getenv("PGHOST") != null && !System.getenv("PGHOST").trim().isEmpty()) {
            String host = System.getenv("PGHOST").trim();
            String port = System.getenv("PGPORT") != null ? System.getenv("PGPORT").trim() : "5432";
            String db = System.getenv("PGDATABASE") != null ? System.getenv("PGDATABASE").trim() : "railway";
            username = System.getenv("PGUSER") != null ? System.getenv("PGUSER").trim() : "postgres";
            password = System.getenv("PGPASSWORD") != null ? System.getenv("PGPASSWORD").trim() : "";
            rawUrl = "jdbc:postgresql://" + host + ":" + port + "/" + db;
            log.info("Constructed database URL from PGHOST ({}:{})", host, port);
        } else if (propertyUrl != null && !propertyUrl.trim().isEmpty() && !isLocalhost(propertyUrl)) {
            rawUrl = propertyUrl.trim();
            username = propertyUsername;
            password = propertyPassword;
            log.info("Using non-localhost database URL from properties");
        } else {
            // Local development fallback
            rawUrl = (propertyUrl != null && !propertyUrl.trim().isEmpty()) ? propertyUrl.trim() : "jdbc:postgresql://localhost:5432/newpp";
            username = (propertyUsername != null && !propertyUsername.trim().isEmpty()) ? propertyUsername : "postgres";
            password = (propertyPassword != null && !propertyPassword.trim().isEmpty()) ? propertyPassword : "postgres";
            log.info("Using local fallback database configuration");
        }

        // 2. Parse URI format if needed (e.g. postgresql://user:pass@host:port/database)
        String finalJdbcUrl = rawUrl;
        if (rawUrl.startsWith("postgresql://") || rawUrl.startsWith("postgres://")) {
            try {
                URI dbUri = new URI(rawUrl);
                String userInfo = dbUri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] userParts = userInfo.split(":", 2);
                    username = userParts[0];
                    password = userParts[1];
                } else if (userInfo != null && !userInfo.isEmpty()) {
                    username = userInfo;
                }
                int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                String path = dbUri.getPath();
                if (path != null && path.startsWith("/")) {
                    path = path.substring(1);
                }
                finalJdbcUrl = "jdbc:postgresql://" + dbUri.getHost() + ":" + port + "/" + path;
                if (dbUri.getQuery() != null && !dbUri.getQuery().isEmpty()) {
                    finalJdbcUrl += "?" + dbUri.getQuery();
                }
                log.info("Successfully converted PostgreSQL URI to JDBC URL: jdbc:postgresql://{}:{}/{}", dbUri.getHost(), port, path);
            } catch (Exception e) {
                log.warn("Could not parse database URI as RFC 2396 URI, using URL directly: {}", e.getMessage());
            }
        } else if (rawUrl.startsWith("jdbc:postgresql://")) {
            finalJdbcUrl = rawUrl;
            if (username == null || username.trim().isEmpty()) {
                username = getFirstNonEmptyEnv("PGUSER", "POSTGRES_USER", "SPRING_DATASOURCE_USERNAME");
                if (username == null) {
                    username = propertyUsername;
                }
            }
            if (password == null) {
                password = getFirstNonEmptyEnv("PGPASSWORD", "POSTGRES_PASSWORD", "SPRING_DATASOURCE_PASSWORD");
                if (password == null) {
                    password = propertyPassword;
                }
            }
        }

        return DataSourceBuilder.create()
                .driverClassName(driverClassName)
                .url(finalJdbcUrl)
                .username(username != null ? username : "postgres")
                .password(password != null ? password : "")
                .build();
    }

    private String getFirstNonEmptyEnv(String... envNames) {
        for (String name : envNames) {
            String val = System.getenv(name);
            if (val != null && !val.trim().isEmpty()) {
                return val;
            }
        }
        return null;
    }

    private boolean isLocalhost(String url) {
        return url.contains("localhost") || url.contains("127.0.0.1");
    }
}
