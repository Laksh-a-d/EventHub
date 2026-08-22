# ==========================================
# STAGE 1: Build Spring Boot Application
# ==========================================
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper and POM
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Ensure maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies offline
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build production package
COPY src ./src
RUN ./mvnw clean package -DskipTests

# ==========================================
# STAGE 2: Runtime Image
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Dynamic port for Railway
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
