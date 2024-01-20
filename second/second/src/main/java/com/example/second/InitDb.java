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
            Category category1 = createCategory("카메라");
            em.persist(category1);
            Category category2 = createCategory("노트북");
            em.persist(category2);
            Category category3 = createCategory("휴대폰");
            em.persist(category3);

            Brand brand1 = createBrand("삼성");
            em.persist(brand1);
            Brand brand2 = createBrand("엘지");
            em.persist(brand2);
            Brand brand3 = createBrand("현대");
            em.persist(brand3);


            Member member1 =new Member();
            member1.setId("admin");
            member1.setRole(MemberRole.ADMIN);
            String password = passwordEncoder.encode("admin1234");
            member1.setPassword(password);
            em.persist(member1);


            Member member2 = createMember("min04192","min04192@naver.com","man","20030223",MemberRole.USER,"pass121");
            em.persist(member2);
            Member member3 = createMember("min0419294","min04192@Gamil.com","man","20030132",MemberRole.USER,"passe1");
            em.persist(member3);


            List<FingerPrincessBrand> fingerPrincessBrands = new ArrayList<>();
            FingerPrincessBrand fingerPrincessBrand1 = FingerPrincessBrand.createFingerPrincessBrand(brand1);
            fingerPrincessBrands.add(fingerPrincessBrand1);
            List<FingerPrincessCategory> fingerPrincessCategories = new ArrayList<>();
            FingerPrincessCategory fingerPrincessCategory = FingerPrincessCategory.createFingerPrincessCategory(category1);
            fingerPrincessCategories.add(fingerPrincessCategory);
            FingerPrincess fingerPrincess = FingerPrincess.createFingerPrincess(member2, fingerPrincessBrands, fingerPrincessCategories);
            em.persist(fingerPrincess);

            List<FingerGuardCategory> fingerGuardCategories = new ArrayList<>();
            FingerGuardCategory fingerGuardCategory = FingerGuardCategory.createFingerGuardCategory(category1);
            fingerGuardCategories.add(fingerGuardCategory);
            FingerGuardCategory fingerGuardCategory1 = FingerGuardCategory.createFingerGuardCategory(category2);
            fingerGuardCategories.add(fingerGuardCategory1);
            FingerGuard fingerGuard = FingerGuard.createFingerGuard(Job.YES, member2, fingerGuardCategories, "안녕하세요 핑가입니다", "openrulrul");
            em.persist(fingerGuard);

            List<FingerGuardCategory> fingerGuardCategories1 = new ArrayList<>();
            FingerGuardCategory fingerGuardCategory2 = FingerGuardCategory.createFingerGuardCategory(category2);
            fingerGuardCategories1.add(fingerGuardCategory2);
            FingerGuardCategory fingerGuardCategory3 = FingerGuardCategory.createFingerGuardCategory(category3);
            fingerGuardCategories1.add(fingerGuardCategory3);
            FingerGuard fingerGuard1 = FingerGuard.createFingerGuard(Job.NO, member3, fingerGuardCategories1, "핑거가드일까요", "open");
            em.persist(fingerGuard1);
//
//            Member member3 =new Member();
//
//
//            member3.setId("mi1");
//            member3.setEmail("min9294");
//            member3.setGender("man");
//            member3.setBirth("20030111");
//            member3.setRole(MemberRole.USER);
//            String pas = passwordEncoder.encode("minm12");
//            member3.setPassword(pas);
//            em.persist(member3);
//            Job job = Job.YES;
//            Product product = new Product();
//            product.setName("radio");
//            List<Product> products= new ArrayList<>();
//            products.add(product);
//            em.persist(product);
//            FingerGuard fingerGuard1 = FingerGuard.createFingerGuard(job, member3, products);
//            em.persist(fingerGuard1);
//
//            Member member4 =new Member();
//            member4.setId("misdf1");
//            member4.setEmail("minsdf9294");
//            member4.setGender("girl");
//            member4.setBirth("20032111");
//            member4.setRole(MemberRole.USER);
//            String pa = passwordEncoder.encode("min12");
//            member4.setPassword(pa);
//            em.persist(member4);
//            Job jobs = Job.YES;
//            Product produc = new Product();
//            produc.setName("mp3");
//            em.persist(produc);
//            List<Product> productss= new ArrayList<>();
//            productss.add(produc);
//            FingerGuard fingerGuard = FingerGuard.createFingerGuard(jobs, member4, productss);
//            fingerGuard.setAuthorizationGuard(AuthorizationGuard.AUTHORIZED);
//            em.persist(fingerGuard);





        }

        private static Brand createBrand(String brandName) {
            Brand brand = new Brand();
            brand.setName(brandName);
            return brand;
        }

        private Member createMember(String id,String email,String gender,String birth,MemberRole memberRole,String password) {
            Member member =new Member();


            member.setId(id);
            member.setEmail(email);
            member.setGender(gender);
            member.setBirth(birth);
            member.setRole(memberRole);
            String pass = passwordEncoder.encode(password);
            member.setPassword(pass);
            return member;
        }

        private static Category createCategory(String name) {
            Category category = new Category();
            category.setName(name);
            return category;
        }

    }
}
