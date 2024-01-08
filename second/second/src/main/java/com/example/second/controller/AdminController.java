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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final LoginService loginService;
    private final MemberService memberService;
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
        return new Result(members);

    }
    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

}
