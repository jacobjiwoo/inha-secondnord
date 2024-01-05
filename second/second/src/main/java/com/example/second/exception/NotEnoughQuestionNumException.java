package com.example.second.exception;

public class NotEnoughQuestionNumException extends RuntimeException {

    public NotEnoughQuestionNumException() {
        super();
    }

    public NotEnoughQuestionNumException(String message) {
        super(message);
    }

    public NotEnoughQuestionNumException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughQuestionNumException(Throwable cause) {
        super(cause);
    }

    protected NotEnoughQuestionNumException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
