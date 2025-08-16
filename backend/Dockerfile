# Use a lightweight Java runtime
FROM eclipse-temurin:17-jdk-alpine

# Set work directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Give execute permission to mvnw
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src ./src

# Package the Spring Boot app
RUN ./mvnw package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "target/student-activity-points-0.0.1-SNAPSHOT.jar"]
