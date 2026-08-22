package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Field;
import java.net.URI;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import com.example.demo.config.DatabaseConfig;
import com.zaxxer.hikari.HikariDataSource;

class DatabaseConfigTest {

    @Test
    void testRailwayPostgreSqlUriParsing() {
        String railwayUrl = "postgresql://postgres:secretPass123@roundhouse.proxy.rlwy.net:54321/railway";

        DatabaseConfig config = new DatabaseConfig();
        ReflectionTestUtils.setField(config, "propertyUrl", railwayUrl);
        ReflectionTestUtils.setField(config, "driverClassName", "org.postgresql.Driver");

        DataSource dataSource = config.dataSource();
        assertNotNull(dataSource);
        assertTrue(dataSource instanceof HikariDataSource);

        HikariDataSource hikari = (HikariDataSource) dataSource;
        assertTrue(hikari.getJdbcUrl().startsWith("jdbc:postgresql://roundhouse.proxy.rlwy.net:54321/railway"));
        assertTrue("postgres".equals(hikari.getUsername()));
        assertTrue("secretPass123".equals(hikari.getPassword()));

        hikari.close();
    }
}
