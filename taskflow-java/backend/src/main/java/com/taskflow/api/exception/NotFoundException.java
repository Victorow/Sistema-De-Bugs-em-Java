// backend/src/main/java/com/taskflow/api/exception/NotFoundException.java
package com.taskflow.api.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
