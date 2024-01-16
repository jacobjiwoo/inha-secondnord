package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FingerGuardCategory {

    //동적 메모리 할당금지!!!!!!!!!!!!
    protected FingerGuardCategory(){
    }

    @Id
    @GeneratedValue
    @Column(name="finger_guard_category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="finger_guard_id")
    private FingerGuard fingerGuard;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    //생성 메서드
    public static FingerGuardCategory createFingerGuardCategory(Category category){
        FingerGuardCategory fingerGuardCategory = new FingerGuardCategory();
        fingerGuardCategory.setCategory(category);
        return fingerGuardCategory;

    }
}
