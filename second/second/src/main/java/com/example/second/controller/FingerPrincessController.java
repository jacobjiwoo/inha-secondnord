package com.example.second.controller;

import com.example.second.Service.FingerGuardService;
import com.example.second.Service.FingerPrincessService;
import com.example.second.SessionConst;
import com.example.second.domain.Member;

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
    @PostMapping("/princess")
    public ResponseSavePrincess savePrincess(@SessionAttribute(name= SessionConst.LOGIN_MEMBER,required = false) Member member, @RequestBody RequestSavePrincess requestSavePrincess){
        List<Long> categoryIds = new ArrayList<>();
        List<Long> brandIds =new ArrayList<>();
        for (RequestSavePrincess.PrincessCategoryDto categoryDto : requestSavePrincess.category) {
            Long id = categoryDto.getId();
            categoryIds.add(id);
        }
        for(RequestSavePrincess.PrincessBrandDto brandDto:requestSavePrincess.brand) {
            Long id = brandDto.getId();
            brandIds.add(id);
        }
        Long aLong = fingerPrincessService.addFingerPrincess(member.getMember_id(), categoryIds, brandIds);


        return new ResponseSavePrincess("ok");
    }

    @Data
    static class RequestSavePrincess{
        private List<PrincessCategoryDto> category;
        private List<PrincessBrandDto> brand;
        @Data
        static class PrincessCategoryDto{
            private Long id;
        }

        @Data
        static class PrincessBrandDto{
            private Long id;
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
