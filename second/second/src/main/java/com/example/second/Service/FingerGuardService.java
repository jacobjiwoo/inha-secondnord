package com.example.second.Service;

import com.example.second.domain.FingerGuard;
import com.example.second.domain.Job;
import com.example.second.domain.Member;
import com.example.second.domain.Product;
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

    @Transactional
    public Long addFingerGuard(Long memberId,List<String> names,Job job){

        List<Product> products= new ArrayList<>();
        int size = names.size();
        for(int i=0; i< size;i++){
            Product product = new Product();

            String name = names.get(i);

            product.setName(name);

            products.add(product);
        }

        Member member = memberRepository.findOne(memberId);
        FingerGuard fingerGuard = FingerGuard.createFingerGuard(job, member, products);
        fingerGuardRepository.save(fingerGuard);
        return fingerGuard.getId();


    }
    @Transactional(readOnly = true)
    public List<FingerGuard> findFingerGuards(){
        return fingerGuardRepository.findAll();
    }



}
