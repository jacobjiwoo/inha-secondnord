package com.example.second.controller;

import com.example.second.Service.LoginService;
import com.example.second.Service.MemberService;
import com.example.second.SessionConst;
import com.example.second.domain.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final LoginService loginService;
    @PostMapping("/join")
    public CreateMemberResponse saveMember(@RequestBody @Valid CreateMemberRequest request){
        Member member = new Member();
        member.setId(request.getId());
        member.setEmail(request.getEmail());
        member.setGender(request.getGender());
        member.setBirth(request.getBirth());
        member.setPassword(request.getPassword());

        Long member_id = memberService.join(member);
        return new CreateMemberResponse(member_id);

    }
    @PostMapping("/login")
    public CreateMemberLoginResponse login(@RequestBody @Valid CreateMemberLoginRequest request, HttpServletRequest servletRequest){
        Member loginMember = loginService.login(request.getId(),request.getPassword());
        log.info("login? {}",loginMember);
        if(loginMember == null){


            return new CreateMemberLoginResponse("아이디 또는 비밀번호 맞지않음");
        }
        //로그인 성공 처리
        //세션이 있다면 있는세션 반환 아니면 생성
        HttpSession session = servletRequest.getSession();
        //세션에 로그인 회원 정보 보관
        session.setAttribute(SessionConst.LOGIN_MEMBER,loginMember);
        return new CreateMemberLoginResponse("성공");



    }
    @PostMapping("/logout")
    public String logoutV2(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return "로그아웃성공";
    }

    @Data
    static class CreateMemberRequest{
        @NotEmpty
        private String email;
        @NotEmpty
        private String id;
        @NotEmpty
        private String gender;
        @NotEmpty
        private String birth;
        @NotEmpty
        private String password;

    }
    @Data
    static class CreateMemberResponse{
        private Long id;

        public CreateMemberResponse(Long id) {
            this.id = id;
        }
    }
    @Data
    static class CreateMemberLoginRequest{

        @NotEmpty
        private String id;
        @NotEmpty
        private String password;

    }
    @Data
    static class CreateMemberLoginResponse{
        String responseURl;

        public CreateMemberLoginResponse(String responseURl) {
            this.responseURl = responseURl;
        }
    }
}
