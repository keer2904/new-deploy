# Use Maven with JDK 17 to build the app
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Use a lightweight JDK image to run
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR from previous stage
COPY --from=build /app/target/*.jar app.jar

# Render sets PORT as env variable, default to 8080
ENV PORT=8080
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
