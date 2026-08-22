# ==========================================
# STAGE 1: Build Spring Boot Backend from demo/
# ==========================================
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper and POM from demo/
COPY demo/.mvn/ .mvn/
COPY demo/mvnw demo/pom.xml ./

# Ensure maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build package
COPY demo/src ./src
RUN ./mvnw clean package -DskipTests

# ==========================================
# STAGE 2: Runtime Image
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy built JAR
COPY --from=build /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
