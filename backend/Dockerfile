FROM adoptopenjdk:11-jre-hotspot
MAINTAINER paulo.ruszel
ARG JAR_FILE=backend/target/backend-1.0.0-SNAPSHOT.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/application.jar"]
