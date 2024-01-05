package com.example.second.Service;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.Job;
import com.example.second.domain.Member;
import com.example.second.repository.FingerGuardRepository;
import com.example.second.repository.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class FingerGuardServiceTest {
    @Autowired
    FingerGuardRepository fingerGuardRepository;
    @Autowired FingerGuardService fingerGuardService;
    @Autowired
    EntityManager em;

    @Test
    public void 핑거가드_추가() throws Exception{
        //given
        Member member = new Member();
        member.setId("min04192");
        member.setEmail("min04192@naver.com");
        member.setGender("man");
        member.setPassword("pasee121!");
        em.persist(member);
        List<String> names = new ArrayList<>();
        List<String> descriptions = new ArrayList<>();
        names.add("radio");
        descriptions.add("this is a radio");
        Job job = Job.YES;
        //when
        Long fingerGuardId = fingerGuardService.addFingerGuard(member.getMember_id(), descriptions, names, job);

        //then
        FingerGuard getFingerGuard = fingerGuardRepository.findOne(fingerGuardId);
        Assert.assertEquals("핑거가드 등록시 product의 name은 radio이어야 한다. ","radio",getFingerGuard.getFavProduct().get(0).getName());
        Assert.assertEquals("핑거가드 등록시 product의 description은 this is a radio 이어야 한다.","this is a radio",getFingerGuard.getFavProduct().get(0).getDescription());
    }

}