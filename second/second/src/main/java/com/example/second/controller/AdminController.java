package com.example.second.controller;

import com.example.second.Service.FingerGuardService;
import com.example.second.Service.FingerPrincessService;
import com.example.second.Service.LoginService;
import com.example.second.Service.MemberService;
import com.example.second.SessionConst;
import com.example.second.domain.*;
import com.example.second.exception.NotAdminException;
import com.example.second.repository.FingerGuardRepository;
import com.example.second.repository.FingerPrincessRepository;
import com.example.second.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final LoginService loginService;
    private final MemberService memberService;
    private final FingerGuardRepository fingerGuardRepository;
    private final FingerPrincessRepository fingerPrincessRepository;
    private final FingerGuardService fingerGuardService;
    private final MemberRepository memberRepository;
    private final FingerPrincessService fingerPrincessService;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NotAdminException.class)
    public ErrorResult notAdminExHandle(NotAdminException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody @Valid MemberController.CreateMemberLoginRequest request, HttpServletRequest servletRequest, HttpServletResponse response){
        Member loginMember = loginService.login(request.getId(),request.getPassword());
        if(loginMember.getRole()== MemberRole.USER){
            throw new NotAdminException("해당 사용자는 관리자가 아닙니다.");
        }
        log.info("login? {}",loginMember);
        if(loginMember == null){
            throw new NullPointerException("아이디혹은 비밀번호가 올바르지 않습니다.");
        }
        //로그인 성공 처리
        //세션이 있다면 있는세션 반환 아니면 생성
        HttpSession session = servletRequest.getSession();
        //세션에 로그인 회원 정보 보관
        session.setAttribute(SessionConst.ADMIN_MEMBER,loginMember);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Set-Cookie",
                "JSESSIONID=" + session.getId() + "; " +
                        "Path=/;" +
                        "Domain=localhost; " +
                        "HttpOnly; " +
                        "Max-Age=604800; "+"SameSite=None; Secure;"
        );
        return new ResponseEntity<>(session.getId(), HttpStatus.OK);

    }

    @GetMapping("/users")
    public Result member(){
        List<Member> members = memberService.findMembers();
        List<MemberDto> resultMember = members.stream().map(m -> new MemberDto(m)).collect(Collectors.toList());
        return new Result<>(resultMember);

    }
    @GetMapping("/users/guard")
    public Result notAuthGuard(){
        List<FingerGuard> fingerGuards = fingerGuardRepository.findAllWithMember();
        List<FingerGuardDto> resultNotAuthorizedGuard = fingerGuards.stream().filter(fingerGuard -> fingerGuard.getAuthorizationGuard() == AuthorizationGuard.NOT_AUTHORIZED)
                .map(f -> new FingerGuardDto(f)).collect(Collectors.toList());
        return new Result<>(resultNotAuthorizedGuard);
    }
    @GetMapping("/users/princess")
    public Result fingerPrincess(){
        List<FingerPrincess> fingerPrincesses = fingerPrincessRepository.findAllWithMember();
        List<FingerPrincessDto> resultFingerPrincess = fingerPrincesses.stream().map(f->new FingerPrincessDto(f)).collect(Collectors.toList());
        return new Result<>(resultFingerPrincess);
    }

    @PatchMapping("/users/guard")
    public Result AuthorizingGuard(@RequestBody RequestNotAuthorizedGuard requestNotAuthorizedGuard){
        for (RequestNotAuthorizedGuard.NotAuthorizedMember notAuthorizedMember : requestNotAuthorizedGuard.allMember) {
            Long fingerGuardId = memberRepository.findOne(notAuthorizedMember.getMember_id()).getFingerGuard().getId();
            fingerGuardService.authorizingGuard(fingerGuardId);
        }
        return new Result<>("ok");
    }

    @PatchMapping("/users/princess")
    public ResponseQuestionNum addQuestion(@RequestBody RequestQuestionNum requestQuestionNum){
        ResponseQuestionNum responseQuestionNum = new ResponseQuestionNum();
        for(RequestQuestionNum.RequestQuestionMember questionMember:requestQuestionNum.allMember){
            Long fingerPrincessId = memberRepository.findOne(questionMember.getMember_id()).getFingerPrincess().getId();
            int remainQuestionNum = fingerPrincessService.addQuestion(fingerPrincessId, questionMember.getQuestion_num());
            ResponseQuestionNum.ResponseQuestionMember responseQuestionMember = new ResponseQuestionNum.ResponseQuestionMember();
            responseQuestionMember.setQuestion_num(remainQuestionNum);
            responseQuestionMember.setMember_id(questionMember.getMember_id());
            responseQuestionNum.allMember.add(responseQuestionMember);
        }
        return responseQuestionNum;

    }
    @Data
    static class ResponseQuestionNum{
        private List<ResponseQuestionMember> allMember =new ArrayList<>();
        @Data
        static class ResponseQuestionMember{
            private Long member_id;
            private int question_num;
        }
    }
    @Data
    static class RequestQuestionNum{
        private List<RequestQuestionMember> allMember;
        @Data
        static class RequestQuestionMember{
            private Long member_id;
            private int question_num;
        }

    }
    @Data
    static class RequestNotAuthorizedGuard{
        private List<NotAuthorizedMember> allMember;
        @Data
        static class NotAuthorizedMember{
            Long member_id;
        }
    }

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T allMember;

    }
    @Data
    static class MemberDto{
        private Long fingerGuardId;
        private Long fingerPrincessId;
        private Long memberId;
        private String birth;
        private String email;
        private String gender;
        private String id;
        private String password;
        private  MemberRole memberRole;

        public MemberDto(Member member) {
            fingerGuardId = (member.getFingerGuard() != null) ? member.getFingerGuard().getId() : null;
            fingerPrincessId = (member.getFingerPrincess() != null) ? member.getFingerPrincess().getId() : null;
            memberId = member.getMember_id();
            birth = member.getBirth();
            email = member.getEmail();
            gender = member.getGender();
            id = member.getId();
            password = member.getPassword();
            memberRole = member.getRole();
        }
    }
    @Data
    static class FingerPrincessDto{
        private Long member_id;
        private String id;
        private String email;
        private int question_num;

        public FingerPrincessDto(FingerPrincess fingerPrincess) {
            this.member_id = fingerPrincess.getMember().getMember_id();
            this.id = fingerPrincess.getMember().getId();
            this.email = fingerPrincess.getMember().getEmail();
            this.question_num = fingerPrincess.getQuestionNum();
        }
    }
    @Data
    static class FingerGuardDto{
        private Long member_id;
        private String birth;
        private String email;
        private String gender;
        private AuthorizationGuard authorizationGuard;


        public FingerGuardDto(FingerGuard fingerGuard) {
            authorizationGuard = fingerGuard.getAuthorizationGuard();
            member_id = fingerGuard.getMember().getMember_id();
            birth = fingerGuard.getMember().getBirth();
            email = fingerGuard.getMember().getEmail();
            gender = fingerGuard.getMember().getGender();



        }
    }
    @Data
    @AllArgsConstructor
    static class ErrorResult{
        private String code;
        private String message;
    }

}
