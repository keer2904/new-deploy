# Use a JDK base image
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven wrapper files
COPY mvnw pom.xml ./
COPY .mvn .mvn

# ✅ Fix Windows issue: give mvnw execute permission inside container
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# ---- Run stage ----
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
