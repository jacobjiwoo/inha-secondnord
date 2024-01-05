package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue
    @Column(name="product_id")
    private Long id;

    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="finger_princess_id")
    private FingerPrincess fingerPrincess;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="finger_guard_id")
    private FingerGuard fingerGuard;
}
