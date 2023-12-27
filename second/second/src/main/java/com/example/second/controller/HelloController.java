package com.example.second.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public HelloResponse response(){
        int id = 5;
        String name = "kim";
        return new HelloResponse(5,name);
    }
    @Data
    static class HelloResponse{

        int id;
        String name;

        public HelloResponse(int id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
