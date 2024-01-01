package com.example.second.Service;

import com.example.second.domain.Member;
import com.example.second.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member){
        memberRepository.save(member);
        //return JwtUtil.createJwt(member.getId(),secretKey,expiredMs);
        return member.getMember_id();
    }


}
