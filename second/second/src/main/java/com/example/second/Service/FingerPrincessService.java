package com.example.second.Service;

import com.example.second.domain.Brand;
import com.example.second.domain.FingerPrincess;
import com.example.second.domain.Member;
import com.example.second.domain.Product;
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

    @Transactional
    public Long addFingerPrincess(Long memberId, List<String> productNames,List<String> brandNames){
        List<Product> products = new ArrayList<>();
        List<Brand> brands = new ArrayList<>();
        int productsSize = products.size();
        int brandsSize = brands.size();
        for(int i=0; i< productsSize;i++){
            Product product = new Product();

            String name = productNames.get(i);

            product.setName(name);

            products.add(product);
        }
        for(int i=0; i< brandsSize;i++){
            Brand brand = new Brand();

            String name = brandNames.get(i);

            brand.setName(name);

            brands.add(brand);
        }
        Member findMember = memberRepository.findOne(memberId);
        FingerPrincess fingerPrincess = FingerPrincess.createFingerPrincess(findMember, brands, products);
        fingerPrincessRepository.save(fingerPrincess);

        return fingerPrincess.getId();


    }


}
