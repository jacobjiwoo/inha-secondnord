package com.example.second.controller;

import com.example.second.Service.LoginService;
import com.example.second.Service.MemberService;
import com.example.second.SessionConst;
import com.example.second.domain.Member;
import com.example.second.domain.MemberRole;
import com.example.second.exception.NotAdminException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final LoginService loginService;
    private final PasswordEncoder passwordEncoder;
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalStateException.class)
    public ErrorResult illegalExHandle(IllegalStateException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NullPointerException.class)
    public ErrorResult NullExHandle(NullPointerException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }
    @PostMapping("/join")
    public CreateMemberResponse saveMember(@RequestBody @Valid CreateMemberRequest request) {
        log.info("member: {}",request.toString());
        Member member = new Member();
        member.setId(request.getId());
        member.setEmail(request.getEmail());
        member.setGender(request.getGender());
        member.setBirth(request.getBirth());
        member.setRole(MemberRole.USER);
        String password = passwordEncoder.encode(request.getPassword());
        member.setPassword(password);

        Long member_id = memberService.join(member);


        return new CreateMemberResponse(member_id);

    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid CreateMemberLoginRequest request, HttpServletRequest servletRequest, HttpServletResponse response){
        Member loginMember = loginService.login(request.getId(),request.getPassword());
        log.info("login? {}",loginMember);
        if(loginMember == null){
            throw new NullPointerException("아이디혹은 비밀번호가 올바르지 않습니다.");
        }
        //로그인 성공 처리
        //세션이 있다면 있는세션 반환 아니면 생성
        HttpSession session = servletRequest.getSession();
        //세션에 로그인 회원 정보 보관
        session.setAttribute(SessionConst.LOGIN_MEMBER,loginMember);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Set-Cookie",
                "JSESSIONID=" + session.getId() + "; " +
                        "Path=/;" +
                        "Domain=second-nord.store; " +
                        "HttpOnly; " +
                        "Max-Age=604800; "+"SameSite=None; Secure;"
        );
        return new ResponseEntity<>(session.getId(), HttpStatus.OK);

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
    @AllArgsConstructor
    static class ErrorResult{
        private String code;
        private String message;
    }
    @Data
    static class CreateMemberRequest {
        @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @Pattern(regexp = "^[A-Za-z0-9]{6,12}$", message = "아이디는 6~12자의 영문 대, 소문자와 숫자의 조합이어야 합니다.")
        private String id;

        @NotEmpty
        private String gender;

        @NotEmpty
        private String birth;

        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$",
                message = "비밀번호는 8~16자의 영문 대소문자, 숫자, 특수기호의 조합이어야 합니다."
        )
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
