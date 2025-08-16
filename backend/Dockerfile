# Use lightweight Java 17 runtime
FROM eclipse-temurin:17-jdk-alpine

# Set work directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies (cache layer)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","target/student-activity-points-0.0.1-SNAPSHOT.jar"]
