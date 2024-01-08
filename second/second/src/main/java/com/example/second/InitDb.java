package com.example.second;

import com.example.second.domain.Member;
import com.example.second.domain.MemberRole;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class InitDb {
    private final InitService initService;
    @PostConstruct
    public void init(){
        initService.dbInit1();
    }
    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService{
        private final EntityManager em;
        private final PasswordEncoder passwordEncoder;
        public void dbInit1(){
            Member member1 =new Member();

            member1.setId("admin");
            member1.setRole(MemberRole.ADMIN);
            String password = passwordEncoder.encode("admin1234");
            member1.setPassword(password);
            em.persist(member1);

            Member member2 =new Member();


            member2.setId("min341");
            member2.setEmail("min0419294");
            member2.setGender("man");
            member2.setBirth("20030223");
            member2.setRole(MemberRole.USER);
            String pass = passwordEncoder.encode("minmin0421212");
            member2.setPassword(pass);
            em.persist(member2);

            Member member3 =new Member();


            member3.setId("mi1");
            member3.setEmail("min9294");
            member3.setGender("man");
            member3.setBirth("20030111");
            member3.setRole(MemberRole.USER);
            String pas = passwordEncoder.encode("minm12");
            member3.setPassword(pas);
            em.persist(member3);




        }

    }
}
