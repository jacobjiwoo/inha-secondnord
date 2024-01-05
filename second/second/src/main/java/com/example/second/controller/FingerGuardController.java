package com.example.second.controller;

import com.example.second.Service.FingerGuardService;
import com.example.second.Service.MemberService;
import com.example.second.SessionConst;
import com.example.second.domain.Job;
import com.example.second.domain.Member;
import com.example.second.domain.Product;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/onboarding")
@RequiredArgsConstructor
@Slf4j
public class FingerGuardController {
    private final MemberService memberService;
    private final FingerGuardService fingerGuardService;
    @PostMapping("/guard")
    public ResponseSaveGuard saveGuard(@RequestBody RequestSaveGuard requestSaveGuard) {

        List<String> descriptions= new ArrayList<>();
        List<String> names = new ArrayList<>();
        Job job;
        if(requestSaveGuard.job == true){
            job = Job.YES;
        }else{
            job = Job.NO;
        }
        for (RequestSaveGuard.ProductDto productDto : requestSaveGuard.product) {
            String description = productDto.getDescription();
            String name = productDto.getName();
            descriptions.add(description);
            names.add(name);

        }
        fingerGuardService.addFingerGuard(1L, descriptions,names,job);

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
