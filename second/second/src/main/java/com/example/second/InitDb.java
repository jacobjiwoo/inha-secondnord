package com.example.second;

import com.example.second.domain.*;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
            Job job = Job.YES;
            Product product = new Product();
            product.setName("radio");
            List<Product> products= new ArrayList<>();
            products.add(product);
            em.persist(product);
            FingerGuard fingerGuard1 = FingerGuard.createFingerGuard(job, member3, products);
            em.persist(fingerGuard1);

            Member member4 =new Member();
            member4.setId("misdf1");
            member4.setEmail("minsdf9294");
            member4.setGender("girl");
            member4.setBirth("20032111");
            member4.setRole(MemberRole.USER);
            String pa = passwordEncoder.encode("min12");
            member4.setPassword(pa);
            em.persist(member4);
            Job jobs = Job.YES;
            Product produc = new Product();
            produc.setName("mp3");
            em.persist(produc);
            List<Product> productss= new ArrayList<>();
            productss.add(produc);
            FingerGuard fingerGuard = FingerGuard.createFingerGuard(jobs, member4, productss);
            fingerGuard.setAuthorizationGuard(AuthorizationGuard.AUTHORIZED);
            em.persist(fingerGuard);





        }

    }
}
