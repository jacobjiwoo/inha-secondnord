package com.example.second.Service;

import com.example.second.domain.Member;
import com.example.second.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    @Transactional
    public Member login(String loginId, String password){

        return memberRepository.findByLoginId(loginId)
                .filter(m -> passwordEncoder.matches(password,m.getPassword())).orElse(null);
    }
}
