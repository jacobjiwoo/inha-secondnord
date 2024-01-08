package com.example.second.exception;

public class NotAdminException extends RuntimeException{
    public NotAdminException() {
        super();
    }

    public NotAdminException(String message) {
        super(message);
    }

    public NotAdminException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotAdminException(Throwable cause) {
        super(cause);
    }
}
