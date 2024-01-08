package com.example.second.controller;

import com.example.second.Service.FingerGuardService;
import com.example.second.Service.FingerPrincessService;
import com.example.second.SessionConst;
import com.example.second.domain.Member;
import com.example.second.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/onboarding")
@RequiredArgsConstructor
@Slf4j
public class FingerPrincessController {
    private final FingerPrincessService fingerPrincessService;
    @PostMapping("princess")
    public ResponseSavePrincess savePrincess(@SessionAttribute(name= SessionConst.LOGIN_MEMBER,required = false) Member member, @RequestBody RequestSavePrincess requestSavePrincess){
        log.info("프로덕트 {}",requestSavePrincess.product);
        log.info("브랜드 {}",requestSavePrincess.brand);
        List<String> productNames = new ArrayList<>();
        List<String> brandNames = new ArrayList<>();
        for(RequestSavePrincess.PrincessProductDto productDto:requestSavePrincess.product){
            String name = productDto.getName();
            productNames.add(name);
        }
        for(RequestSavePrincess.PrincessBrandDto brandDto:requestSavePrincess.brand){
            brandNames.add(brandDto.getName());
        }
        /**
         *세션으로 교체필요
         */
        Long aLong = fingerPrincessService.addFingerPrincess(member.getMember_id(), productNames, brandNames);


        return new ResponseSavePrincess("ok");
    }

    @Data
    static class RequestSavePrincess{
        private List<PrincessProductDto> product;
        private List<PrincessBrandDto> brand;
        @Data
        static class PrincessProductDto{
            private String name;
        }

        @Data
        static class PrincessBrandDto{
            private String name;
        }


    }
    @Data
    static class ResponseSavePrincess{
        private String response;

        public ResponseSavePrincess(String response) {
            this.response = response;
        }
    }

}
