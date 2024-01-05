package com.example.second.domain;

import com.example.second.exception.NotEnoughQuestionNumException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class FingerPrincess {

    @Id
    @GeneratedValue
    @Column(name="finger_princess_id")
    private Long id;
    @OneToMany(mappedBy = "fingerPrincess",cascade = CascadeType.ALL)
    private List<Brand> favBrand = new ArrayList<>();
    @OneToMany(mappedBy = "fingerPrincess",cascade = CascadeType.ALL)
    private List<Product> favProduct = new ArrayList<>();

    private int questionNum;

    //비즈니스 로직

    /**
     *질문개수 추가
     */
    public void addQuestionNum(int num){
        this.questionNum += num;
    }
    /**
     * 질문개수 감소
     */
    public void removeQuestionNum(){
        int restQuestionNum = this.questionNum - 1;
        if(restQuestionNum <0){
            throw new NotEnoughQuestionNumException("your question num is not enough");
        }
        this.questionNum = restQuestionNum;
    }
    /**
     * 연관관계 편의 메서드
     */
    public void addBrand(Brand brand){
        favBrand.add(brand);
        brand.setFingerPrincess(this);
    }
    public void addProduct(Product product){
        favProduct.add(product);
        product.setFingerPrincess(this);
    }



}
