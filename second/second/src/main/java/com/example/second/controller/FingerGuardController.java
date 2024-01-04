package com.example.second.controller;

import com.example.second.domain.Member;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/onboarding")
public class FingerGuardController {
    @PostMapping("/guard")
    public ResponseSaveGuard saveGuard(@RequestBody  RequestSaveGuard requestSaveGuard) {

        return new ResponseSaveGuard("ok");

    }
    @Getter @Setter
    static class ResponseSaveGuard{
        private String response;

        public ResponseSaveGuard(String response) {
            this.response = response;
        }
    }
    @Data
    static class RequestSaveGuard {
        private List<ProductDto> product;
        private boolean job;

        @Data
        static class ProductDto {
            private String name;
            private String description;
        }
    }
}
