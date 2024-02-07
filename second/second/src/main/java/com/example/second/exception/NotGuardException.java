package com.example.second.exception;

public class NotGuardException extends RuntimeException{
    public NotGuardException() {
        super();
    }

    public NotGuardException(String message) {
        super(message);
    }

    public NotGuardException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotGuardException(Throwable cause) {
        super(cause);
    }
}
