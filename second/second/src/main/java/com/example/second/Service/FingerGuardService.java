package com.example.second.Service;

import com.example.second.domain.*;
import com.example.second.repository.CategoryRepository;
import com.example.second.repository.FingerGuardCategoryRepository;
import com.example.second.repository.FingerGuardRepository;
import com.example.second.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FingerGuardService {
    private final MemberRepository memberRepository;
    private final FingerGuardRepository fingerGuardRepository;
    private final CategoryRepository categoryRepository;
    private final FingerGuardCategoryRepository fingerGuardCategoryRepository;

    @Transactional
    public Long addFingerGuard(Long memberId,List<Long> categoryIds,String openurl,String introduction,Job job){

        List<FingerGuardCategory> fingerGuardCategories= new ArrayList<>();
        for(Long id:categoryIds){
            Category findCategory = categoryRepository.findOne(id);
            FingerGuardCategory fingerGuardCategory = FingerGuardCategory.createFingerGuardCategory(findCategory);
            fingerGuardCategories.add(fingerGuardCategory);
        }

        Member member = memberRepository.findOne(memberId);
        FingerGuard fingerGuard = FingerGuard.createFingerGuard(job, member, fingerGuardCategories,introduction,openurl);
        fingerGuardRepository.save(fingerGuard);
        return fingerGuard.getId();


    }
    @Transactional(readOnly = true)
    public List<FingerGuard> findFingerGuards(){
        return fingerGuardRepository.findAll();
    }
    @Transactional
    public void authorizingGuard(Long guardId){
        FingerGuard one = fingerGuardRepository.findOne(guardId);
        one.setAuthorizationGuard(AuthorizationGuard.AUTHORIZED);
    }



}
