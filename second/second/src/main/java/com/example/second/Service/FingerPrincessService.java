package com.example.second.Service;

import com.example.second.domain.*;

import com.example.second.repository.BrandRepository;
import com.example.second.repository.CategoryRepository;
import com.example.second.repository.FingerPrincessRepository;
import com.example.second.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FingerPrincessService {
    private final MemberRepository memberRepository;
    private final FingerPrincessRepository fingerPrincessRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    @Transactional
    public Long addFingerPrincess(Long memberId, List<Long> categoryIds,List<Long> brandIds){
        List<FingerPrincessCategory> fingerPrincessCategories = new ArrayList<>();
        List<FingerPrincessBrand> fingerPrincessBrands = new ArrayList<>();
        for(Long id:categoryIds){
            Category findCategory = categoryRepository.findOne(id);
            FingerPrincessCategory fingerPrincessCategory = FingerPrincessCategory.createFingerPrincessCategory(findCategory);
            fingerPrincessCategories.add(fingerPrincessCategory);

        }
        for(Long id:brandIds){
            Brand findBrand = brandRepository.findOne(id);
            FingerPrincessBrand fingerPrincessBrand = FingerPrincessBrand.createFingerPrincessBrand(findBrand);
            fingerPrincessBrands.add(fingerPrincessBrand);

        }
        Member findMember = memberRepository.findOne(memberId);
        FingerPrincess fingerPrincess = FingerPrincess.createFingerPrincess(findMember, fingerPrincessBrands, fingerPrincessCategories);
        fingerPrincessRepository.save(fingerPrincess);
        return fingerPrincess.getId();


    }


}
