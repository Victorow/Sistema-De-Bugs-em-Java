// backend/src/main/java/com/taskflow/api/exception/BadRequestException.java
package com.taskflow.api.exception;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
