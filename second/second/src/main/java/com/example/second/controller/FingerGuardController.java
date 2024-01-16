package com.example.second.controller;

import com.example.second.Service.FingerGuardService;
import com.example.second.Service.MemberService;
import com.example.second.SessionConst;
import com.example.second.domain.Job;
import com.example.second.domain.Member;
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
    public ResponseSaveGuard saveGuard(@SessionAttribute(name= SessionConst.LOGIN_MEMBER,required = false)Member member,@RequestBody RequestSaveGuard requestSaveGuard) {
        //경험
        Job job;
        if(requestSaveGuard.job == true){
            job = Job.YES;
        }else{
            job = Job.NO;
        }
        //카테고리 아이디
        List<Long> categoryId = new ArrayList<>();
        for (RequestSaveGuard.CategoryDto categoryDto : requestSaveGuard.category) {
            Long id = categoryDto.getId();
            categoryId.add(id);
        }
        //오픈url
        String openUrl = requestSaveGuard.getOpen_url();
        //소개
        String introduction = requestSaveGuard.getIntroduction();


        fingerGuardService.addFingerGuard(member.getMember_id(),categoryId,openUrl,introduction,job);

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
        private List<CategoryDto> category;
        private String introduction;
        private String open_url;
        private boolean job;
        @Data
        static class CategoryDto{
            private Long id;
        }

    }


}
