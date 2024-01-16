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
    private List<FingerPrincessBrand> fingerPrincessBrands = new ArrayList<>();

    @OneToMany(mappedBy = "fingerPrincess",cascade = CascadeType.ALL)
    private List<FingerPrincessCategory> fingerPrincessCategories = new ArrayList<>();

    @OneToOne(mappedBy = "fingerPrincess",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    Member member;

    private int questionNum;

    //비즈니스 로직
    public static FingerPrincess createFingerPrincess(Member member,List<FingerPrincessBrand> brands,List<FingerPrincessCategory> categories){
        FingerPrincess fingerPrincess = new FingerPrincess();
        fingerPrincess.setQuestionNum(0);
        fingerPrincess.addMember(member);
        for (FingerPrincessCategory fingerPrincessCategory : categories) {
            fingerPrincess.addFingerPrincessCategory(fingerPrincessCategory);
        }
        for(FingerPrincessBrand fingerPrincessBrand: brands){
            fingerPrincess.addFingerPrincessBrand(fingerPrincessBrand);
        }
        return fingerPrincess;
    }
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

    //채워야함
    public void addFingerPrincessCategory(FingerPrincessCategory fingerPrincessCategory){
        fingerPrincessCategories.add(fingerPrincessCategory);
        fingerPrincessCategory.setFingerPrincess(this);

    }
    public void addFingerPrincessBrand(FingerPrincessBrand fingerPrincessBrand){
        fingerPrincessBrands.add(fingerPrincessBrand);
        fingerPrincessBrand.setFingerPrincess(this);
    }
    public void addMember(Member member){
        this.member = member;
        member.setFingerPrincess(this);
    }



}
