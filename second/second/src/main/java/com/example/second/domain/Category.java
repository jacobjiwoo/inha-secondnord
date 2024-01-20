package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue
    @Column(name="category_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category",fetch = FetchType.LAZY)
    private List<FingerGuardCategory> fingerGuardCategories = new ArrayList<>();



    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name ="finger_princess_id")
    //private FingerPrincess fingerPrincess;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name="finger_guard_id")
    //private FingerGuard fingerGuard;
}
