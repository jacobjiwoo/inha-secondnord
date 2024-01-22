package com.example.second.controller;

import com.example.second.domain.Category;
import com.example.second.domain.FingerGuard;
import com.example.second.domain.FingerGuardCategory;
import com.example.second.domain.Job;
import com.example.second.repository.CategoryRepository;
import com.example.second.repository.FingerGuardRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class HomeController {
    private final CategoryRepository categoryRepository;
    private final FingerGuardRepository fingerGuardRepository;
    @GetMapping("/home")
    public ResponseHome home(){
        List<Category> all = categoryRepository.findAll();
        ResponseHome responseHome = new ResponseHome();
        for (Category category : all) {
            ResponseHome.HomeCategoryDto homeCategoryDto = new ResponseHome.HomeCategoryDto(category.getId(),category.getName());
            responseHome.categories.add(homeCategoryDto);
        }
        return  responseHome;
    }
    @GetMapping("/categories/{category_id}")
    public ResponseCategory category(@PathVariable("category_id") Long categoryId){
        ResponseCategory responseCategory = new ResponseCategory();
        //핑가 모두다찾아와
        List<FingerGuard> allWithMemberAndCategories = fingerGuardRepository.findAllWithMemberAndCategories();
        log.info("개수 = {}",allWithMemberAndCategories.size());
        //각각의 핑가에 대해서
        for (FingerGuard allWithMemberAndCategory : allWithMemberAndCategories) {
            log.info("클래스명:{}",allWithMemberAndCategory.getClass());
            //핑가의 카테고리 리스트를 가져와서
            List<FingerGuardCategory> fingerGuardCategories = allWithMemberAndCategory.getFingerGuardCategories();
            for (FingerGuardCategory fingerGuardCategory : fingerGuardCategories) {
                if (fingerGuardCategory.getCategory().getId() == categoryId) {
                    log.info("호출");
                    List<ResponseCategory.AllMemberDto.Categories> collect = fingerGuardCategories.stream().map(fgc -> new ResponseCategory.AllMemberDto.Categories(fgc)).collect(Collectors.toList());
                    ResponseCategory.AllMemberDto allMemberDto = new ResponseCategory.AllMemberDto(allWithMemberAndCategory, collect);
                    responseCategory.allMember.add(allMemberDto);


                }

            }
        }

        return responseCategory;
    }

    @GetMapping("/profile/guard/{finger_guard_id}")
    public ResponseGuard guardProfile(@PathVariable("finger_guard_id")Long id){
        FingerGuard withCategoriesAndMember = fingerGuardRepository.findWithCategoriesAndMember(id);
        List<FingerGuardCategory> fingerGuardCategories = withCategoriesAndMember.getFingerGuardCategories();
        List<ResponseGuard.ResponseCategory> collect = fingerGuardCategories.stream().map(f -> new ResponseGuard.ResponseCategory(f)).collect(Collectors.toList());
        ResponseGuard responseGuard = new ResponseGuard(withCategoriesAndMember,collect);

        return responseGuard;
    }
    @Data
    static class ResponseGuard{
        private Long finger_guard_id;
        private String id;
        private List<ResponseCategory> categories;

        public ResponseGuard(FingerGuard fingerGuard,List<ResponseCategory> responseCategory) {
            this.finger_guard_id = fingerGuard.getId();
            this.id = fingerGuard.getMember().getId();
            this.categories = responseCategory;
            this.introduction = fingerGuard.getIntroduction();
            if(fingerGuard.getJob()== Job.YES){
                this.job = true;
            }
            else{
                this.job = false;
            }

            this.open_url = fingerGuard.getOpenUrl();
        }

        @Data
        static class ResponseCategory{
            private Long category_id;
            private String name;

            public ResponseCategory(FingerGuardCategory fingerGuardCategory) {
                this.category_id = fingerGuardCategory.getCategory().getId();
                this.name = fingerGuardCategory.getCategory().getName();
            }
        }
        private String introduction;
        private Boolean job;
        private String open_url;

    }

    @Data
    static class ResponseCategory{
        private List<AllMemberDto> allMember=new ArrayList<>();
        @Data
        static class AllMemberDto{
            private Long finger_guard_id;
            private String id;
            private List<Categories> categories;

            public AllMemberDto( FingerGuard fingerGuard,List<Categories> categories) {
                this.finger_guard_id = fingerGuard.getId();
                this.id = fingerGuard.getMember().getId();
                this.categories = categories;
                this.introduction = fingerGuard.getIntroduction();
            }

            @Data
            static class Categories{
                private Long category_id;
                private String name;

                public Categories(FingerGuardCategory fingerGuardCategory) {
                    this.category_id = fingerGuardCategory.getId();
                    this.name = fingerGuardCategory.getCategory().getName();
                }
            }

            private String introduction;
        }

    }
    @Data
    static class ResponseHome{
        private List<HomeCategoryDto> categories=new ArrayList<>();
        @Data
        @AllArgsConstructor
        static class HomeCategoryDto{
            private Long category_id;
            private String name;
        }
    }

}
