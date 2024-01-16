package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FingerPrincessCategory {

    //동적 메모리 할당금지!!!!!!!!!!!!
    protected FingerPrincessCategory(){
    }
    @Id
    @GeneratedValue
    @Column(name="finger_princess_category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "finger_princess_id")
    private FingerPrincess fingerPrincess;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    //생성 메서드
    public static FingerPrincessCategory createFingerPrincessCategory(Category category){
        FingerPrincessCategory fingerPrincessCategory = new FingerPrincessCategory();
        fingerPrincessCategory.setCategory(category);
        return fingerPrincessCategory;

    }
}
