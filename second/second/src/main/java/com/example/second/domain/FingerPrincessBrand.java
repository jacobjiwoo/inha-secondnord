package com.example.second.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FingerPrincessBrand {
    @Id
    @GeneratedValue
    @Column(name="finger_princess_brand_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "finger_princess_id")
    private FingerPrincess fingerPrincess;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    //생성 메서드
    public static FingerPrincessBrand createFingerPrincessBrand(Brand brand){
        FingerPrincessBrand fingerPrincessBrand = new FingerPrincessBrand();
        fingerPrincessBrand.setBrand(brand);
        return fingerPrincessBrand;

    }
}
