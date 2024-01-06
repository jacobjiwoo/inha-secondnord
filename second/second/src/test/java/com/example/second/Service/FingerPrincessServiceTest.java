package com.example.second.Service;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.FingerPrincess;
import com.example.second.domain.Member;
import com.example.second.exception.NotEnoughQuestionNumException;
import com.example.second.repository.FingerPrincessRepository;
import jakarta.persistence.EntityManager;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
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
public class FingerPrincessServiceTest {
    @Autowired FingerPrincessService fingerPrincessService;
    @Autowired
    FingerPrincessRepository fingerPrincessRepository;
    @Autowired
    EntityManager em;
    @Test
    public void 핑거_프린세스_추가() throws Exception{
        //given
        Member member = new Member();
        member.setId("min04192");
        member.setEmail("min04192@naver.com");
        member.setGender("man");
        member.setPassword("pasee121!");
        em.persist(member);
        List<String> productNames = new ArrayList<>();
        productNames.add("radio");
        List<String> brandNames = new ArrayList<>();
        brandNames.add("samsung");
        //when
        Long princessId = fingerPrincessService.addFingerPrincess(member.getMember_id(), productNames, brandNames);


        //then
        FingerPrincess findPrincess = fingerPrincessRepository.findOne(princessId);
        Assert.assertEquals("핑거가드 등록시 질문개수는 0개여야한다.",0,findPrincess.getQuestionNum());


    }
    @Test(expected = NotEnoughQuestionNumException.class)
    public void 질문개수_0개미만오류(){
        //given
        Member member = new Member();
        member.setId("min04192");
        member.setEmail("min04192@naver.com");
        member.setGender("man");
        member.setPassword("pasee121!");
        em.persist(member);

        List<String> productNames = new ArrayList<>();
        productNames.add("radio");
        List<String> brandNames = new ArrayList<>();
        brandNames.add("samsung");

        Long princessId = fingerPrincessService.addFingerPrincess(member.getMember_id(), productNames, brandNames);
        FingerPrincess findPrincess = fingerPrincessRepository.findOne(princessId);
        //when
        findPrincess.removeQuestionNum();
        //then
        fail("NotEnoughQuestionNumException 이 발생해야한다");





    }

}